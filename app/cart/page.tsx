"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/cart";
import { formatPrice } from "@/lib/currency";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore();
  const subtotal = totalPrice();
  const shipping = subtotal >= 150 ? 0 : 12;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <ShoppingBag size={64} className="mb-6 text-zinc-200" />
        <h1 className="text-2xl font-bold text-zinc-900">Your cart is empty</h1>
        <p className="mt-2 text-zinc-500">Looks like you haven't added anything yet.</p>
        <Link href="/shop" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800">
          Continue Shopping <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Shopping Cart</h1>
          <button onClick={clearCart} className="text-sm text-zinc-500 transition hover:text-red-500">
            Clear all
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Items */}
          <div className="space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={`${item.product.id}-${item.size}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
                >
                  <Link href={`/product/${item.product.slug}`} className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-zinc-100">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="96px" />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link href={`/product/${item.product.slug}`} className="font-semibold text-zinc-900 hover:underline">
                          {item.product.name}
                        </Link>
                        <p className="mt-0.5 text-sm text-zinc-500">Size: {item.size}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="rounded-full p-1.5 text-zinc-500 transition hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center rounded-lg border border-zinc-200">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="px-3 py-2 text-zinc-500 transition hover:text-zinc-900"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="min-w-[32px] text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="px-3 py-2 text-zinc-500 transition hover:text-zinc-900"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-bold text-zinc-900">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="self-start rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-lg font-bold text-zinc-900">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-green-600 font-medium">Free</span> : formatPrice(shipping)}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-zinc-500">Add {formatPrice(150 - subtotal)} more for free shipping</p>
              )}
              <div className="border-t border-zinc-100 pt-3">
                <div className="flex justify-between text-base font-bold text-zinc-900">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {/* Promo */}
            <div className="mt-5 flex gap-2">
              <input
                type="text"
                placeholder="Promo code"
                className="flex-1 rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
              />
              <button className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:bg-zinc-50">
                Apply
              </button>
            </div>

            <Link
              href="/checkout"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-4 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Checkout <ArrowRight size={16} />
            </Link>
            <Link href="/shop" className="mt-3 block text-center text-sm text-zinc-500 transition hover:text-zinc-700">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
