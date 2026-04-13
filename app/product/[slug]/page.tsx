"use client";

import Image from "next/image";
import { use, useState, useEffect } from "react";
import { ArrowRight, Minus, Plus, ShoppingBag, Zap, Heart, Share2, Check } from "lucide-react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { products } from "@/lib/products";
import { useCartStore } from "@/lib/cart";
import { useWishlistStore } from "@/lib/wishlist";
import { useRecentStore } from "@/lib/recent";
import StarRating from "@/components/ui/StarRating";

const mockReviews = [
  { name: "Alex M.", rating: 5, date: "Jan 2025", text: "Absolutely love the quality. Exceeded my expectations — the material feels premium and the fit is perfect." },
  { name: "Sarah K.", rating: 4, date: "Dec 2024", text: "Great product, fast shipping. Sizing runs slightly large so I'd recommend going one size down." },
  { name: "James T.", rating: 5, date: "Nov 2024", text: "Bought this as a gift and the recipient was thrilled. Packaging was beautiful too." },
];

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const found = products.find((p) => p.slug === slug);
  if (!found) notFound();
  const product = found;

  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState<"S" | "M" | "L" | "XL">("M");
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const { toggle, has } = useWishlistStore();
  const addRecent = useRecentStore((s) => s.add);
  const wishlisted = has(product.id);

  useEffect(() => {
    addRecent(product);
  }, [product.id]);

  const images = [product.image,
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80",
  ];

  function handleAddToCart() {
    addItem(product, selectedSize, quantity);
    toast.success(`Added to cart!`, { icon: "🛍️" });
  }

  function handleBuyNow() {
    addItem(product, selectedSize, quantity);
    router.push("/checkout");
  }

  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Link copied!");
    setTimeout(() => setCopied(false), 2000);
  }

  function handleWishlist() {
    toggle(product);
    toast(wishlisted ? "Removed from wishlist" : "Added to wishlist!", {
      icon: wishlisted ? "💔" : "❤️",
    });
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const recentItems = useRecentStore.getState().items.filter((p) => p.id !== product.id).slice(0, 4);

  const avgRating = mockReviews.reduce((s, r) => s + r.rating, 0) / mockReviews.length;

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-zinc-500">
          <Link href="/" className="transition hover:text-zinc-700">Home</Link>
          <ArrowRight size={12} />
          <Link href="/shop" className="transition hover:text-zinc-700">Shop</Link>
          <ArrowRight size={12} />
          <Link href={`/shop?category=${product.category}`} className="transition hover:text-zinc-700">{product.category}</Link>
          <ArrowRight size={12} />
          <span className="text-zinc-700">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Images */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(idx)}
                  className={`relative h-20 w-20 overflow-hidden rounded-xl border-2 transition-all ${
                    idx === selectedImg ? "border-black shadow-md" : "border-zinc-200 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`view ${idx + 1}`} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
            <motion.div
              key={selectedImg}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative flex-1 overflow-hidden rounded-2xl bg-zinc-100"
              style={{ minHeight: 480 }}
            >
              <Image src={images[selectedImg]} alt={product.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" priority />
              {product.badge && (
                <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${
                  product.badge === "Sale" ? "bg-red-500 text-white" :
                  product.badge === "New" ? "bg-black text-white" : "bg-amber-400 text-black"
                }`}>{product.badge}</span>
              )}
            </motion.div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">{product.category}</span>
              <div className="flex items-center gap-1">
                <button onClick={handleShare} className="rounded-full p-2 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700" aria-label="Share">
                  {copied ? <Check size={18} className="text-green-500" /> : <Share2 size={18} />}
                </button>
                <button onClick={handleWishlist} className="rounded-full p-2 transition hover:bg-zinc-100" aria-label="Wishlist">
                  <Heart size={18} className={wishlisted ? "fill-red-500 text-red-500" : "text-zinc-400"} />
                </button>
              </div>
            </div>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">{product.name}</h1>

            <div className="mt-3 flex items-center gap-4">
              <span className="text-3xl font-bold text-zinc-900">${product.price}</span>
              {product.originalPrice && <span className="text-lg text-zinc-400 line-through">${product.originalPrice}</span>}
              {product.originalPrice && (
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            <div className="mt-3 flex items-center gap-3">
              <StarRating rating={product.rating} />
              <span className="text-sm text-zinc-500">({product.reviews} reviews)</span>
            </div>

            <p className="mt-5 text-base leading-relaxed text-zinc-600">{product.description}</p>

            {/* Size */}
            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-500">Size</h3>
                <button className="text-xs text-zinc-500 underline underline-offset-2 hover:text-zinc-700">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(["S", "M", "L", "XL"] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[52px] rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${
                      selectedSize === size
                        ? "border-black bg-black text-white shadow-md"
                        : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500">Quantity</h3>
              <div className="inline-flex items-center rounded-xl border border-zinc-200 bg-white">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-4 py-3 text-zinc-500 transition hover:text-zinc-900">
                  <Minus size={16} />
                </button>
                <span className="min-w-[40px] text-center text-sm font-semibold">{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} className="px-4 py-3 text-zinc-500 transition hover:text-zinc-900">
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 space-y-3">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                <ShoppingBag size={18} /> Add to Cart — ${(product.price * quantity).toFixed(2)}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleBuyNow}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-black px-6 py-4 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
              >
                <Zap size={18} /> Buy Now
              </motion.button>
            </div>

            {/* Trust */}
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-zinc-100 pt-6 text-center text-xs text-zinc-500">
              <div>🚚 Free over $150</div>
              <div>↩️ 30-day returns</div>
              <div>🔒 Secure checkout</div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-20">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Customer Reviews</h2>
              <div className="mt-2 flex items-center gap-3">
                <StarRating rating={avgRating} />
                <span className="text-sm text-zinc-500">{avgRating.toFixed(1)} out of 5 · {mockReviews.length} reviews</span>
              </div>
            </div>
            <button className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium shadow-sm transition hover:bg-zinc-50">
              Write a Review
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockReviews.map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white">
                      {review.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">{review.name}</p>
                      <p className="text-xs text-zinc-500">{review.date}</p>
                    </div>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-sm leading-relaxed text-zinc-600">{review.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900">You May Also Like</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p, idx) => (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  <Link href={`/product/${p.slug}`}>
                    <div className="relative h-56 w-full overflow-hidden bg-zinc-100">
                      <Image src={p.image} alt={p.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="25vw" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-zinc-900">{p.name}</h3>
                      <div className="mt-2 flex items-center justify-between">
                        <StarRating rating={p.rating} />
                        <span className="font-bold text-zinc-900">${p.price}</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        {recentItems.length > 0 && (
          <section className="mt-20">
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900">Recently Viewed</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {recentItems.map((p, idx) => (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  <Link href={`/product/${p.slug}`}>
                    <div className="relative h-48 w-full overflow-hidden bg-zinc-100">
                      <Image src={p.image} alt={p.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="25vw" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-zinc-900">{p.name}</h3>
                      <span className="mt-1 block font-bold text-zinc-900">${p.price}</span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
