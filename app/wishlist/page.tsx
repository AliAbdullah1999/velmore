"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useWishlistStore } from "@/lib/wishlist";
import { useCartStore } from "@/lib/cart";
import StarRating from "@/components/ui/StarRating";

export default function WishlistPage() {
  const { items, toggle } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);

  if (items.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <Heart size={64} className="mb-6 text-zinc-200" />
        <h1 className="text-2xl font-bold text-zinc-900">Your wishlist is empty</h1>
        <p className="mt-2 text-zinc-500">Save items you love for later.</p>
        <Link href="/shop" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-zinc-900">
          Wishlist <span className="text-lg font-normal text-zinc-500">({items.length} items)</span>
        </h1>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence>
            {items.map((product, idx) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
              >
                <Link href={`/product/${product.slug}`}>
                  <div className="relative h-56 w-full overflow-hidden bg-zinc-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/product/${product.slug}`}>
                    <p className="mb-0.5 text-xs font-medium uppercase tracking-wider text-zinc-500">{product.category}</p>
                    <h3 className="font-semibold text-zinc-900 hover:underline">{product.name}</h3>
                  </Link>
                  <div className="mt-2">
                    <StarRating rating={product.rating} />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-bold text-zinc-900">${product.price}</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => { addItem(product, "M"); toast.success("Added to cart!"); }}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-black py-2 text-xs font-semibold text-white transition hover:bg-zinc-800"
                    >
                      <ShoppingBag size={14} /> Add to Cart
                    </button>
                    <button
                      onClick={() => { toggle(product); toast("Removed from wishlist", { icon: "💔" }); }}
                      className="rounded-lg border border-zinc-200 p-2 text-zinc-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
