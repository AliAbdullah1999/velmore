"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown, Sparkles } from "lucide-react";

const words = ["Crafted", "for", "Everyday", "Luxury"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.8, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[100vh] items-center justify-center overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 object-cover w-full h-full"
        style={{ width: "100vw", height: "100%" }}
      >
        <source src="/hero-section.mp4" type="video/mp4" />
      </video>

      {/* Enhanced gradient overlay with multiple layers */}
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-black/80"
      />

      {/* Animated accent elements */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-1/4 left-1/2 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent"
      />

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.7 }}
        className="absolute bottom-1/4 left-1/2 h-px w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window?.innerWidth || 1000,
              y: Math.random() * window?.innerHeight || 800,
              opacity: 0,
            }}
            animate={{
              x: Math.random() * window?.innerWidth || 1000,
              y: Math.random() * window?.innerHeight || 800,
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            className="absolute h-1 w-1 rounded-full bg-white/20"
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center sm:px-6">
        {/* Enhanced main heading */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          {words.map((word, wordIndex) => (
            <motion.div
              key={word}
              variants={wordVariants}
              className="relative"
            >
              <motion.span
                className="inline-block text-display-2xl font-bold tracking-tighter text-white sm:text-display-xl lg:text-display-2xl"
                style={{
                  textShadow: "0 25px 50px rgba(0,0,0,0.8), 0 0 80px rgba(255,255,255,0.1)",
                }}
                whileHover={{
                  scale: 1.05,
                  textShadow: "0 30px 60px rgba(0,0,0,0.9), 0 0 100px rgba(255,255,255,0.2)",
                  transition: { duration: 0.3 }
                }}
              >
                {word.split('').map((letter, letterIndex) => (
                  <motion.span
                    key={letterIndex}
                    variants={letterVariants}
                    className="inline-block"
                    whileHover={{
                      y: -2,
                      color: wordIndex === 0 ? '#f59e0b' : wordIndex === 3 ? '#6366f1' : '#ffffff',
                      transition: { duration: 0.2 }
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.span>

              {/* Sparkle effect for first word */}
              {wordIndex === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="absolute -top-2 -right-2"
                >
                  <Sparkles className="h-6 w-6 text-amber-400" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mx-auto mb-12 max-w-3xl"
        >
          <p className="text-body-lg leading-relaxed text-neutral-300 sm:text-xl md:text-2xl">
            Explore a curated collection of refined essentials. Built with mindful
            materials and designed for{" "}
            <span className="text-gradient font-semibold">timeless elegance</span>.
          </p>
        </motion.div>

        {/* Enhanced CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col items-center justify-center gap-6 sm:flex-row"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group"
          >
            <Link
              href="/shop"
              className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold shadow-2xl shadow-white/10 transition-all duration-300 hover:shadow-white/20"
            >
              Shop Now
              <motion.div
                className="transition-transform group-hover:translate-x-1"
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                →
              </motion.div>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group"
          >
            <Link
              href="/#categories"
              className="btn-outline inline-flex items-center justify-center gap-2 border-2 border-white/60 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white/15 hover:shadow-xl hover:shadow-white/10"
            >
              Explore Collection
              <motion.div
                className="transition-transform group-hover:translate-x-1"
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                ↓
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-6 w-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500" />
              ))}
            </div>
            <span>Trusted by 10,000+ customers</span>
          </div>
        </motion.div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/50 hover:text-white/80 transition-colors cursor-pointer"
        >
          <ChevronDown size={32} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
