"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const words = ["Crafted", "for", "Everyday", "Luxury"];

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[100vh] items-center justify-center overflow-hidden bg-black">
      <Image
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80"
        alt="Elegant store interior featuring luxury apparel"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
          className="mb-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {words.map((word) => (
            <motion.span
              key={word}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
              }}
              className="inline-block text-5xl font-bold tracking-tight text-white sm:text-7xl"
              style={{ textShadow: "0 10px 30px rgba(0,0,0,0.5)" }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mx-auto mb-10 max-w-2xl text-base text-zinc-200 sm:text-lg"
        >
          Explore a curated collection of refined essentials. Built with mindful materials and designed for timeless elegance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-zinc-100 hover:shadow-2xl"
          >
            Shop Now
          </Link>
          <Link
            href="/#categories"
            className="inline-flex items-center justify-center rounded-full border-2 border-white/60 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/20"
          >
            Explore Collection
          </Link>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/70"
      >
        <ChevronDown size={28} strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
