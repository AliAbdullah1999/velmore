import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { processPayment } from "@/lib/payments";
import { paymentSchema } from "@/lib/validations";
import { sendPaymentConfirmation } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = paymentSchema.parse(body);

    // Verify order exists
    const order = await prisma.order.findUnique({
      where: { id: validatedData.orderId },
      include: {
        shipping: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // Process payment
    const paymentResult = await processPayment(validatedData);

    if (!paymentResult.success) {
      // Create failed payment record
      await prisma.payment.create({
        data: {
          orderId: validatedData.orderId,
          amount: validatedData.amount,
          paymentMethod: validatedData.paymentMethod,
          status: "FAILED",
          errorMessage: paymentResult.message,
        },
      });

      return NextResponse.json(
        { error: paymentResult.message },
        { status: 400 }
      );
    }

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        orderId: validatedData.orderId,
        amount: validatedData.amount,
        paymentMethod: validatedData.paymentMethod,
        transactionId: paymentResult.transactionId,
        status: "COMPLETED",
      },
    });

    // Update order status
    await prisma.order.update({
      where: { id: validatedData.orderId },
      data: {
        paymentStatus: "COMPLETED",
        status: "CONFIRMED",
      },
    });

    // Send payment confirmation email
    await sendPaymentConfirmation(
      validatedData.email,
      order.orderNumber,
      validatedData.amount,
      validatedData.paymentMethod
    );

    return NextResponse.json(
      {
        message: "Payment processed successfully",
        payment,
        redirectUrl: paymentResult.url,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to process payment" },
      { status: 500 }
    );
  }
}
