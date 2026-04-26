import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const sig = request.headers.get("stripe-signature");
    if (!sig) {
      return NextResponse.json(
        { error: "Missing stripe signature" },
        { status: 400 }
      );
    }

    const body = await request.text();
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    // Handle specific events
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const orderId = paymentIntent.metadata?.orderId;

        if (orderId) {
          await prisma.payment.update({
            where: { stripePaymentId: paymentIntent.id },
            data: {
              status: "COMPLETED",
            },
          });

          await prisma.order.update({
            where: { id: orderId },
            data: {
              paymentStatus: "COMPLETED",
              status: "CONFIRMED",
            },
          });
        }
        break;

      case "payment_intent.payment_failed":
        const failedIntent = event.data.object as Stripe.PaymentIntent;
        const failedOrderId = failedIntent.metadata?.orderId;

        if (failedOrderId) {
          await prisma.payment.update({
            where: { stripePaymentId: failedIntent.id },
            data: {
              status: "FAILED",
              errorMessage: "Payment failed",
            },
          });
        }
        break;

      case "charge.refunded":
        const refund = event.data.object as Stripe.Charge;
        if (refund.payment_intent) {
          await prisma.payment.updateMany({
            where: { stripePaymentId: refund.payment_intent as string },
            data: {
              status: "REFUNDED",
            },
          });
        }
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Webhook error" },
      { status: 400 }
    );
  }
}
