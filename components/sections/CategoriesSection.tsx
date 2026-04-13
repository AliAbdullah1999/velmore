"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    title: "Clothing",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Handcrafted",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Utility Gear",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
  },
];

export default function CategoriesSection() {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-zinc-500">Collections</p>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Explore Categories</h2>
        </div>
        <Link href="/shop" className="hidden items-center gap-1 text-sm font-medium text-zinc-500 transition hover:text-zinc-900 sm:flex">
          View all <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Link
              href={`/shop?category=${encodeURIComponent(cat.title)}`}
              className="group relative block overflow-hidden rounded-2xl"
            >
              <div className="relative h-64 w-full overflow-hidden bg-zinc-200">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition duration-300 group-hover:from-black/80" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-lg font-bold text-white">{cat.title}</p>
                <div className="mt-1 flex items-center gap-1 text-xs font-medium text-white/70 transition duration-300 group-hover:text-white">
                  Shop now <ArrowRight size={12} className="transition duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
