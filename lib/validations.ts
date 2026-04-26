import { z } from "zod";

// Auth schemas
export const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^(\+92|0)[0-9]{10}$/, "Invalid Pakistani phone number"),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

export const passwordResetSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const newPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Product schemas
export const addToCartSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().min(1),
  size: z.enum(["XS", "S", "M", "L", "XL", "XXL"]).optional(),
});

export const createReviewSchema = z.object({
  productId: z.string(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(10).max(500),
});

// Order schemas
export const shippingInfoSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^(\+92|0)[0-9]{10}$/, "Invalid Pakistani phone number"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  province: z.string().min(2, "Province is required"),
  zipCode: z.string().min(4, "Zip code is required"),
});

export const checkoutSchema = z.object({
  paymentMethod: z.enum([
    "stripe",
    "paypal",
    "jazz_cash",
    "easypaisa",
    "hbl",
    "bank_transfer",
    "cod"
  ]),
  shippingInfo: shippingInfoSchema,
  billingAddressSame: z.boolean().default(true),
});

// Payment schemas
export const paymentSchema = z.object({
  orderId: z.string(),
  amount: z.number().positive(),
  email: z.string().email(),
  name: z.string(),
  phone: z.string(),
  paymentMethod: z.enum([
    "stripe",
    "paypal",
    "jazz_cash",
    "easypaisa",
    "hbl",
    "bank_transfer",
    "cod"
  ]),
});

// Newsletter schema
export const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// Address schema
export const addressSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().regex(/^(\+92|0)[0-9]{10}$/, "Invalid Pakistani phone number"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  province: z.string().min(2, "Province is required"),
  zipCode: z.string().min(4, "Zip code is required"),
  isDefault: z.boolean().default(false),
});

// Types exported from schemas
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type AddToCartData = z.infer<typeof addToCartSchema>;
export type CreateReviewData = z.infer<typeof createReviewSchema>;
export type ShippingInfoData = z.infer<typeof shippingInfoSchema>;
export type CheckoutData = z.infer<typeof checkoutSchema>;
export type PaymentData = z.infer<typeof paymentSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;
export type AddressData = z.infer<typeof addressSchema>;
