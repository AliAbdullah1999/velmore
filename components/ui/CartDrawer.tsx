"use client";

import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/cart";
import { formatPrice } from "@/lib/currency";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const subtotal = totalPrice();
  const shipping = subtotal >= 150 ? 0 : 12;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
              <h2 className="text-lg font-bold text-zinc-900">
                Cart {items.length > 0 && <span className="ml-1 text-sm font-normal text-zinc-500">({items.length} items)</span>}
              </h2>
              <button onClick={onClose} className="rounded-full p-2 transition hover:bg-zinc-100">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag size={48} className="mb-4 text-zinc-200" />
                  <p className="font-semibold text-zinc-700">Your cart is empty</p>
                  <p className="mt-1 text-sm text-zinc-500">Add some items to get started</p>
                  <button
                    onClick={onClose}
                    className="mt-6 rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={`${item.product.id}-${item.size}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex gap-3 rounded-xl border border-zinc-100 bg-zinc-50 p-3"
                      >
                        <Link href={`/product/${item.product.slug}`} onClick={onClose} className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-200">
                          <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="80px" />
                        </Link>
                        <div className="flex flex-1 flex-col justify-between min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <Link href={`/product/${item.product.slug}`} onClick={onClose} className="block truncate text-sm font-semibold text-zinc-900 hover:underline">
                                {item.product.name}
                              </Link>
                              <p className="text-xs text-zinc-500">Size: {item.size}</p>
                            </div>
                            <button onClick={() => removeItem(item.product.id, item.size)} className="flex-shrink-0 rounded-full p-1 text-zinc-300 transition hover:bg-red-50 hover:text-red-500">
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="inline-flex items-center rounded-lg border border-zinc-200 bg-white">
                              <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)} className="px-2.5 py-1.5 text-zinc-500 transition hover:text-zinc-900">
                                <Minus size={12} />
                              </button>
                              <span className="min-w-[24px] text-center text-xs font-semibold">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)} className="px-2.5 py-1.5 text-zinc-500 transition hover:text-zinc-900">
                                <Plus size={12} />
                              </button>
                            </div>
                            <span className="text-sm font-bold text-zinc-900">{formatPrice(item.product.price * item.quantity)}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-zinc-100 px-5 py-5 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-zinc-500">
                    <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? <span className="font-medium text-green-600">Free</span> : formatPrice(shipping)}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-zinc-500">
                      Add <span className="font-semibold text-zinc-700">{formatPrice(150 - subtotal)}</span> more for free shipping
                    </p>
                  )}
                  <div className="flex justify-between border-t border-zinc-100 pt-2 text-base font-bold text-zinc-900">
                    <span>Total</span><span>{formatPrice(subtotal + shipping)}</span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
                >
                  Checkout <ArrowRight size={16} />
                </Link>
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="block text-center text-sm text-zinc-500 transition hover:text-zinc-700"
                >
                  View full cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
