import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { newsletterSchema } from "@/lib/validations";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = newsletterSchema.parse(body);

    // Check if already subscribed
    const existing = await prisma.newsletter.findUnique({
      where: { email: validatedData.email },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Already subscribed to newsletter" },
        { status: 200 }
      );
    }

    // Create subscription
    const subscription = await prisma.newsletter.create({
      data: {
        email: validatedData.email,
      },
    });

    // Send welcome email
    await sendWelcomeEmail(
      validatedData.email,
      validatedData.email.split("@")[0]
    );

    return NextResponse.json(
      {
        message: "Successfully subscribed to newsletter",
        subscription,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to subscribe" },
      { status: 500 }
    );
  }
}
