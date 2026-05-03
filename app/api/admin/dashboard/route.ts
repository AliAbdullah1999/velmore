import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    // Check admin access
    if (!session?.user?.email?.includes("admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [totalOrders, totalProducts, totalCustomers, pendingOrders, totalRevenue, recentOrders] = await Promise.all([
      prisma.order.count(),
      prisma.product.count(),
      prisma.user.count(),
      prisma.order.count({
        where: { status: "PENDING" },
      }),
      prisma.order.aggregate({
        where: { paymentStatus: "COMPLETED" },
        _sum: { total: true },
      }),
      prisma.order.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { name: true, email: true },
          },
        },
      }),
    ]);

    return NextResponse.json({
      totalOrders,
      totalProducts,
      totalCustomers,
      pendingOrders,
      totalRevenue: totalRevenue._sum.total || 0,
      recentOrders,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}
