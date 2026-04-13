"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";
import StarRating from "@/components/ui/StarRating";

export default function FeaturedProductsSection() {
  const featured = products.slice(0, 8);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-zinc-400">Curated Picks</p>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Featured Products</h2>
          </div>
          <Link href="/shop" className="hidden items-center gap-1 text-sm font-medium text-zinc-500 transition hover:text-zinc-900 sm:flex">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, idx) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              className="group overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Link href={`/product/${product.slug}`}>
                <div className="relative h-60 w-full overflow-hidden bg-zinc-200">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    priority={idx < 4}
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  {product.badge && (
                    <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      product.badge === "Sale" ? "bg-red-500 text-white" :
                      product.badge === "New" ? "bg-black text-white" :
                      "bg-amber-400 text-black"
                    }`}>
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="block rounded-full bg-black/90 py-2 text-center text-xs font-semibold text-white backdrop-blur-sm">
                      Quick View
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">{product.category}</p>
                  <h3 className="font-semibold text-zinc-900">{product.name}</h3>
                  <div className="mt-2">
                    <StarRating rating={product.rating} />
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-lg font-bold text-zinc-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-zinc-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link href="/shop" className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 hover:border-black hover:text-black">
            View All Products <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
