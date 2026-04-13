"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Lock, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/cart";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const subtotal = totalPrice();
  const shipping = subtotal >= 150 ? 0 : 12;
  const total = subtotal + shipping;
  const [placed, setPlaced] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPlaced(true);
    clearCart();
  }

  if (placed) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
          <CheckCircle size={72} className="mb-6 text-green-500" />
        </motion.div>
        <h1 className="text-3xl font-bold text-zinc-900">Order Placed!</h1>
        <p className="mt-3 max-w-md text-zinc-500">
          Thank you for your purchase. You'll receive a confirmation email shortly.
        </p>
        <Link href="/shop" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href="/cart" className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-zinc-900">
          <ArrowLeft size={16} /> Back to Cart
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-lg font-bold text-zinc-900">Contact Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">First Name</label>
                  <input required className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black" placeholder="John" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">Last Name</label>
                  <input required className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black" placeholder="Doe" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">Email</label>
                  <input required type="email" className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black" placeholder="john@example.com" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">Phone</label>
                  <input type="tel" className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-lg font-bold text-zinc-900">Shipping Address</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">Address</label>
                  <input required className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black" placeholder="123 Main Street" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">City</label>
                  <input required className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black" placeholder="New York" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">ZIP Code</label>
                  <input required className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black" placeholder="10001" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">Country</label>
                  <select required className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black">
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                    <option>Germany</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-lg font-bold text-zinc-900">Payment</h2>
              <div className="grid gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">Card Number</label>
                  <input required className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black" placeholder="1234 5678 9012 3456" maxLength={19} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">Expiry</label>
                    <input required className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black" placeholder="MM / YY" maxLength={7} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">CVV</label>
                    <input required className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black" placeholder="123" maxLength={4} />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-black py-4 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              <Lock size={16} /> Place Order · ${total.toFixed(2)}
            </button>
          </form>

          {/* Summary */}
          <div className="self-start rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-lg font-bold text-zinc-900">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex items-center gap-3">
                  <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="56px" />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-700 text-[10px] font-bold text-white">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-zinc-900">{item.product.name}</p>
                    <p className="text-xs text-zinc-500">Size: {item.size}</p>
                  </div>
                  <span className="text-sm font-semibold text-zinc-900">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-2 border-t border-zinc-100 pt-4 text-sm">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-green-600 font-medium">Free</span> : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between border-t border-zinc-100 pt-2 text-base font-bold text-zinc-900">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
