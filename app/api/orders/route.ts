import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { checkoutSchema } from "@/lib/validations";
import { sendOrderConfirmation } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = checkoutSchema.parse(body);

    // Get cart items from request body
    const cartItems = body.cartItems || [];

    if (cartItems.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    // Calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of cartItems) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.productId} not found` },
          { status: 400 }
        );
      }

      const itemPrice = product.salePrice || product.price;
      const itemSubtotal = itemPrice * item.quantity;
      subtotal += itemSubtotal;

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        size: item.size,
        price: itemPrice,
        subtotal: itemSubtotal,
      });
    }

    // Calculate tax (17% GST in Pakistan)
    const tax = subtotal * 0.17;

    // Calculate shipping (free if > 150 PKR)
    const shippingCost = subtotal > 150 ? 0 : 300;

    // Calculate total
    const total = subtotal + tax + shippingCost;

    // Create order
    const orderNumber = `ORD${Date.now()}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: session.user.id,
        paymentMethod: validatedData.paymentMethod,
        subtotal,
        tax,
        shippingCost,
        total,
        items: {
          create: orderItems,
        },
        shipping: {
          create: {
            name: validatedData.shippingInfo.name,
            email: validatedData.shippingInfo.email,
            phone: validatedData.shippingInfo.phone,
            address: validatedData.shippingInfo.address,
            city: validatedData.shippingInfo.city,
            province: validatedData.shippingInfo.province,
            zipCode: validatedData.shippingInfo.zipCode,
            country: "Pakistan",
          },
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // Send order confirmation email
    await sendOrderConfirmation(
      validatedData.shippingInfo.email,
      orderNumber,
      total,
      cartItems.map((item: any) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      }))
    );

    return NextResponse.json(
      {
        message: "Order created successfully",
        order,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
        shipping: true,
        payment: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ orders });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
