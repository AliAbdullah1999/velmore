"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const categories = [
  {
    title: "Clothing",
    description: "Timeless pieces for everyday elegance",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    color: "from-blue-600/80 to-indigo-700/80",
  },
  {
    title: "Handcrafted",
    description: "Artisan-made with care and precision",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
    color: "from-amber-600/80 to-orange-700/80",
  },
  {
    title: "Utility Gear",
    description: "Functional design meets modern lifestyle",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    color: "from-green-600/80 to-emerald-700/80",
  },
  {
    title: "Accessories",
    description: "Complete your look with our curated selection",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    color: "from-purple-600/80 to-violet-700/80",
  },
];

export default function CategoriesSection() {
  return (
    <section id="categories" className="bg-surface-secondary py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-brand-accent" />
            <p className="text-caption text-neutral-500">Collections</p>
            <Sparkles className="h-5 w-5 text-brand-accent" />
          </div>
          <h2 className="text-display-lg text-neutral-900 mb-4">
            Explore Categories
          </h2>
          <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
            Discover our carefully curated collections, each telling a story of craftsmanship and style
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group"
            >
              <Link
                href={`/shop?category=${encodeURIComponent(cat.title)}`}
                className="card-interactive block overflow-hidden h-full"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />

                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-60 transition-opacity duration-300 group-hover:opacity-40`} />

                  {/* Content overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.1 + 0.3 }}
                      className="text-white"
                    >
                      <h3 className="text-display-sm font-bold mb-2 group-hover:text-brand-accent transition-colors duration-300">
                        {cat.title}
                      </h3>
                      <p className="text-body-sm text-white/90 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {cat.description}
                      </p>
                      <div className="flex items-center gap-2 text-body-sm font-medium">
                        <span>Shop now</span>
                        <motion.div
                          className="transition-transform duration-300 group-hover:translate-x-2"
                        >
                          <ArrowRight size={16} />
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Hover effect border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-secondary/50 transition-colors duration-300 rounded-xl" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/shop"
            className="btn-secondary inline-flex items-center gap-2 group"
          >
            View All Categories
            <motion.div
              className="transition-transform group-hover:translate-x-1"
            >
              <ArrowRight size={16} />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
