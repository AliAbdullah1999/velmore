import nodemailer from "nodemailer";

const emailService = process.env.EMAIL_SERVICE || "sendgrid";

let transporter: nodemailer.Transporter | null = null;

// Initialize email transporter based on configured service
function getTransporter(): nodemailer.Transporter {
  if (transporter) return transporter;

  if (emailService === "sendgrid") {
    transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      secure: false,
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY!,
      },
    });
  } else if (emailService === "mailgun") {
    transporter = nodemailer.createTransport({
      host: "smtp.mailgun.org",
      port: 587,
      secure: false,
      auth: {
        user: `postmaster@${process.env.MAILGUN_DOMAIN}`,
        pass: process.env.MAILGUN_API_KEY!,
      },
    });
  } else {
    // Default to SendGrid
    transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      secure: false,
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY!,
      },
    });
  }

  return transporter;
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const transporter = getTransporter();

    await transporter.sendMail({
      from: `Velmora Store <no-reply@velmora.com>`,
      ...options,
    });

    return true;
  } catch (error) {
    console.error("Email sending error:", error);
    return false;
  }
}

// Order confirmation email
export async function sendOrderConfirmation(
  email: string,
  orderNumber: string,
  total: number,
  items: Array<{ name: string; quantity: number; price: number }>
): Promise<boolean> {
  const itemsHtml = items
    .map(
      (item) =>
        `<tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">PKR ${item.price}</td>
        </tr>`
    )
    .join("");

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Order Confirmation</h2>
      <p>Thank you for your order! Your order has been confirmed and will be processed shortly.</p>
      
      <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Order Number:</strong> ${orderNumber}</p>
        <p><strong>Order Date:</strong> ${new Date().toLocaleDateString('en-PK')}</p>
      </div>
      
      <h3>Order Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: #f5f5f5;">
            <th style="padding: 8px; text-align: left;">Product</th>
            <th style="padding: 8px; text-align: center;">Quantity</th>
            <th style="padding: 8px; text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
      
      <div style="text-align: right; padding: 20px 0;">
        <p style="font-size: 18px;"><strong>Total: PKR ${total}</strong></p>
      </div>
      
      <p>We will keep you updated about your order status. You can track your order using your order number.</p>
      <p>Thank you for shopping with Velmora Store!</p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: `Order Confirmation - ${orderNumber}`,
    html,
  });
}

// Shipment notification
export async function sendShipmentNotification(
  email: string,
  orderNumber: string,
  trackingNumber: string,
  carrier: string
): Promise<boolean> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Your Order Has Been Shipped!</h2>
      <p>Your order is on its way. Here are your tracking details:</p>
      
      <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Order Number:</strong> ${orderNumber}</p>
        <p><strong>Carrier:</strong> ${carrier}</p>
        <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
      </div>
      
      <p>You can track your shipment using the tracking number above on the carrier's website.</p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: `Shipment Notification - ${orderNumber}`,
    html,
  });
}

// Newsletter subscription
export async function sendWelcomeEmail(email: string, name: string): Promise<boolean> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Welcome to Velmora Store!</h2>
      <p>Hi ${name},</p>
      <p>Thank you for subscribing to our newsletter. You'll now receive updates about:</p>
      <ul>
        <li>New product launches</li>
        <li>Exclusive deals and discounts</li>
        <li>Fashion tips and trends</li>
        <li>Special events and sales</li>
      </ul>
      <p>We're excited to have you in our community!</p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: "Welcome to Velmora Store",
    html,
  });
}

// Payment confirmation
export async function sendPaymentConfirmation(
  email: string,
  orderNumber: string,
  amount: number,
  paymentMethod: string
): Promise<boolean> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Payment Received</h2>
      <p>We have received your payment. Thank you!</p>
      
      <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Order Number:</strong> ${orderNumber}</p>
        <p><strong>Amount Paid:</strong> PKR ${amount}</p>
        <p><strong>Payment Method:</strong> ${paymentMethod}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-PK')}</p>
      </div>
      
      <p>Your order will be processed and shipped shortly.</p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: `Payment Confirmation - ${orderNumber}`,
    html,
  });
}

// Password reset email
export async function sendPasswordResetEmail(
  email: string,
  resetLink: string
): Promise<boolean> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Reset Your Password</h2>
      <p>We received a request to reset your password. Click the link below to proceed:</p>
      
      <div style="margin: 20px 0;">
        <a href="${resetLink}" style="background: #000; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">Reset Password</a>
      </div>
      
      <p>This link will expire in 24 hours.</p>
      <p>If you didn't request this, you can safely ignore this email.</p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: "Reset Your Velmora Store Password",
    html,
  });
}
