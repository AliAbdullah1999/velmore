"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Heart, ShoppingCart, Eye } from "lucide-react";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/currency";
import StarRating from "@/components/ui/StarRating";

export default function FeaturedProductsSection() {
  const featured = products.slice(0, 8);

  return (
    <section className="bg-surface-secondary py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <p className="mb-2 text-caption text-neutral-500">Curated Picks</p>
            <h2 className="text-display-lg text-neutral-900">Featured Products</h2>
          </div>
          <Link
            href="/shop"
            className="hidden items-center gap-2 text-body-sm font-semibold text-neutral-600 transition-colors hover:text-brand-secondary sm:flex"
          >
            View all <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, idx) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              className="product-card group"
            >
              <Link href={`/product/${product.slug}`}>
                <div className="product-card-image aspect-square relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={idx < 4}
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />

                  {/* Enhanced Badge */}
                  {product.badge && (
                    <div className={`absolute left-4 top-4 badge ${
                      product.badge === "Sale" ? "badge-sale" :
                      product.badge === "New" ? "badge-new" :
                      "badge-warning"
                    }`}>
                      {product.badge}
                    </div>
                  )}

                  {/* Quick Actions Overlay */}
                  <div className="product-card-overlay flex items-center justify-center">
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:text-brand-secondary"
                        onClick={(e) => {
                          e.preventDefault();
                          // Add to wishlist logic
                        }}
                      >
                        <Heart size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:text-brand-secondary"
                        onClick={(e) => {
                          e.preventDefault();
                          // Quick view logic
                        }}
                      >
                        <Eye size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-secondary text-white shadow-lg backdrop-blur-sm transition-all hover:bg-brand-secondary/90"
                        onClick={(e) => {
                          e.preventDefault();
                          // Add to cart logic
                        }}
                      >
                        <ShoppingCart size={18} />
                      </motion.button>
                    </div>
                  </div>
                </div>

                <div className="product-card-content">
                  <p className="text-caption text-neutral-500 mb-1">{product.category}</p>
                  <h3 className="product-card-title line-clamp-2">{product.name}</h3>

                  <div className="flex items-center gap-1 mb-3">
                    <StarRating rating={product.rating} size="sm" />
                    <span className="text-body-sm text-neutral-500 ml-1">
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="product-card-price">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="product-card-price-original">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    {product.originalPrice && (
                      <div className="badge badge-success">
                        Save {formatPrice(product.originalPrice - product.price)}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center sm:hidden"
        >
          <Link
            href="/shop"
            className="btn-secondary inline-flex items-center gap-2"
          >
            View All Products <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
