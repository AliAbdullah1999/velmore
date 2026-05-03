"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/currency";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim().length > 1
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-20 z-50 w-full max-w-xl -translate-x-1/2 px-4"
          >
            <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
              {/* Input */}
              <div className="flex items-center gap-3 border-b border-zinc-100 px-4 py-3.5">
                <Search size={18} className="flex-shrink-0 text-zinc-400" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, categories..."
                  className="flex-1 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                />
                {query && (
                  <button onClick={() => setQuery("")} className="text-zinc-400 hover:text-zinc-700">
                    <X size={16} />
                  </button>
                )}
                <button onClick={onClose} className="rounded-lg border border-zinc-200 px-2 py-1 text-xs text-zinc-400 hover:bg-zinc-50">
                  ESC
                </button>
              </div>

              {/* Results */}
              {query.trim().length > 1 && (
                <div className="max-h-96 overflow-y-auto">
                  {results.length === 0 ? (
                    <div className="px-4 py-8 text-center text-sm text-zinc-400">
                      No results for "<span className="font-medium text-zinc-700">{query}</span>"
                    </div>
                  ) : (
                    <div className="p-2">
                      {results.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-3 rounded-xl p-2.5 transition hover:bg-zinc-50"
                        >
                          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="48px" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-semibold text-zinc-900">{product.name}</p>
                            <p className="text-xs text-zinc-400">{product.category}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-zinc-900">{formatPrice(product.price)}</span>
                            <ArrowRight size={14} className="text-zinc-300" />
                          </div>
                        </Link>
                      ))}
                      <Link
                        href={`/shop?q=${encodeURIComponent(query)}`}
                        onClick={onClose}
                        className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-50 py-2.5 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100"
                      >
                        View all results for "{query}" <ArrowRight size={14} />
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Default state */}
              {query.trim().length <= 1 && (
                <div className="p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">Popular Categories</p>
                  <div className="flex flex-wrap gap-2">
                    {["Clothing", "Accessories", "Handcrafted", "Utility Gear"].map((cat) => (
                      <Link
                        key={cat}
                        href={`/shop?category=${encodeURIComponent(cat)}`}
                        onClick={onClose}
                        className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 transition hover:border-black hover:text-black"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
