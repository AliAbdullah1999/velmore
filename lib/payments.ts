import Stripe from "stripe";
import axios from "axios";
import crypto from "crypto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export interface PaymentRequest {
  orderId: string;
  amount: number;
  email: string;
  name: string;
  phone: string;
  paymentMethod: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  url?: string;
  message: string;
}

// ============ STRIPE PAYMENT ============
export async function processStripePayment(req: PaymentRequest): Promise<PaymentResponse> {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(req.amount * 100), // Convert to cents
      currency: "usd",
      metadata: {
        orderId: req.orderId,
        email: req.email,
      },
    });

    return {
      success: true,
      transactionId: paymentIntent.id,
      message: "Stripe payment intent created",
    };
  } catch (error) {
    return {
      success: false,
      message: `Stripe error: ${error}`,
    };
  }
}

// ============ PAYPAL PAYMENT ============
export async function processPayPalPayment(req: PaymentRequest): Promise<PaymentResponse> {
  try {
    const { access_token } = await getPayPalAccessToken();

    const response = await axios.post(
      "https://api-m.sandbox.paypal.com/v2/checkout/orders",
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: (req.amount / 260).toFixed(2), // Convert PKR to USD
            },
          },
        ],
        payer: {
          email_address: req.email,
          name: {
            given_name: req.name.split(" ")[0],
            surname: req.name.split(" ")[1] || "",
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const approvalLink = response.data.links.find(
      (link: any) => link.rel === "approve"
    );

    return {
      success: true,
      transactionId: response.data.id,
      url: approvalLink?.href,
      message: "PayPal order created",
    };
  } catch (error) {
    return {
      success: false,
      message: `PayPal error: ${error}`,
    };
  }
}

async function getPayPalAccessToken(): Promise<{ access_token: string }> {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const response = await axios.post(
    "https://api-m.sandbox.paypal.com/v1/oauth2/token",
    "grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
}

// ============ JAZZCASH PAYMENT (Pakistan) ============
export async function processJazzCashPayment(req: PaymentRequest): Promise<PaymentResponse> {
  try {
    const txnRef = `TXN${Date.now()}`;
    const merchantId = process.env.JAZZCASH_MERCHANT_ID!;
    const password = process.env.JAZZCASH_PASSWORD!;
    const integrityCheckKey = process.env.JAZZCASH_INTEGRITY_CHECK_KEY!;

    // Create integrity check string
    const hashString = `${merchantId}${password}${req.amount}${txnRef}${integrityCheckKey}`;
    const pp_SecureHash = crypto
      .createHash("sha256")
      .update(hashString)
      .digest("hex");

    const jazzCashData = {
      pp_merchant_id: merchantId,
      pp_language: "EN",
      pp_amount: (req.amount * 100).toString(), // JazzCash expects amount in cents
      pp_txn_ref: txnRef,
      pp_return_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/callback/jazzcash`,
      pp_notify_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/webhook/jazzcash`,
      pp_customer_email: req.email,
      pp_customer_mobile: req.phone,
      pp_SecureHash: pp_SecureHash,
    };

    return {
      success: true,
      transactionId: txnRef,
      message: "JazzCash payment initiated",
    };
  } catch (error) {
    return {
      success: false,
      message: `JazzCash error: ${error}`,
    };
  }
}

// ============ EASYPAISA PAYMENT (Pakistan) ============
export async function processEasypaisaPayment(req: PaymentRequest): Promise<PaymentResponse> {
  try {
    const transactionRef = `EPS${Date.now()}`;
    const storeId = process.env.EASYPAISA_STORE_ID!;
    const merchantId = process.env.EASYPAISA_MERCHANT_ID!;
    const apiKey = process.env.EASYPAISA_API_KEY!;

    const easypaisaData = {
      merchantId: merchantId,
      storeId: storeId,
      amount: req.amount,
      transactionRef: transactionRef,
      customerEmail: req.email,
      customerPhone: req.phone,
      customerName: req.name,
      returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/callback/easypaisa`,
      notifyUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/webhook/easypaisa`,
    };

    // Generate signature
    const dataString = JSON.stringify(easypaisaData);
    const signature = crypto
      .createHmac("sha256", apiKey)
      .update(dataString)
      .digest("hex");

    return {
      success: true,
      transactionId: transactionRef,
      message: "Easypaisa payment initiated",
    };
  } catch (error) {
    return {
      success: false,
      message: `Easypaisa error: ${error}`,
    };
  }
}

// ============ HBL (Pakistan) ============
export async function processHBLPayment(req: PaymentRequest): Promise<PaymentResponse> {
  try {
    const merchantId = process.env.HBL_MERCHANT_ID!;
    const referenceNo = `HBL${Date.now()}`;

    const hblData = {
      MerchantID: merchantId,
      ReferenceNo: referenceNo,
      Amount: req.amount,
      CurrencyCode: "586", // PKR currency code
      TransactionType: "SALE",
      Language: "EN",
      ReturnURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/callback/hbl`,
      NotifyURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/webhook/hbl`,
      CustomerEmail: req.email,
      CustomerPhone: req.phone,
      CustomerName: req.name,
    };

    return {
      success: true,
      transactionId: referenceNo,
      message: "HBL payment initiated",
    };
  } catch (error) {
    return {
      success: false,
      message: `HBL error: ${error}`,
    };
  }
}

// ============ BANK TRANSFER (Pakistan) ============
export async function processBankTransferPayment(req: PaymentRequest): Promise<PaymentResponse> {
  return {
    success: true,
    transactionId: `BANK${Date.now()}`,
    message: `Please transfer PKR ${req.amount} to our bank account. Bank details will be sent to ${req.email}`,
  };
}

// ============ CASH ON DELIVERY (COD) ============
export async function processCODPayment(req: PaymentRequest): Promise<PaymentResponse> {
  return {
    success: true,
    transactionId: `COD${Date.now()}`,
    message: "Order will be delivered on a COD basis",
  };
}

// ============ MAIN PAYMENT PROCESSOR ============
export async function processPayment(req: PaymentRequest): Promise<PaymentResponse> {
  switch (req.paymentMethod.toLowerCase()) {
    case "stripe":
      return processStripePayment(req);
    case "paypal":
      return processPayPalPayment(req);
    case "jazz_cash":
    case "jazzcash":
      return processJazzCashPayment(req);
    case "easypaisa":
      return processEasypaisaPayment(req);
    case "hbl":
      return processHBLPayment(req);
    case "bank_transfer":
      return processBankTransferPayment(req);
    case "cod":
      return processCODPayment(req);
    default:
      return {
        success: false,
        message: "Unsupported payment method",
      };
  }
}
