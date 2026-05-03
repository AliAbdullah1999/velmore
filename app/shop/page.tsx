"use client";

import Image from "next/image";
import { useMemo, useState, useEffect, Suspense } from "react";
import { Filter, Minus, Plus, X, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { products } from "@/lib/products";
import { useCartStore } from "@/lib/cart";
import { formatPrice } from "@/lib/currency";
import StarRating from "@/components/ui/StarRating";

const PRICE_RANGES = [
  { label: "Under PKR 100", min: 0, max: 100 },
  { label: "PKR 100 - PKR 175", min: 100, max: 175 },
  { label: "Over PKR 175", min: 175, max: Infinity },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);

  const [categoryOpen, setCategoryOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "newest">("newest");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategories([cat]);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (selectedCategories.length) list = list.filter((p) => selectedCategories.includes(p.category));
    if (selectedPrices.length) {
      list = list.filter((p) =>
        selectedPrices.some((label) => {
          const r = PRICE_RANGES.find((x) => x.label === label);
          return r ? p.price >= r.min && p.price < r.max : true;
        })
      );
    }
    if (sortBy === "price-asc") return list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") return list.sort((a, b) => b.price - a.price);
    return list;
  }, [selectedCategories, selectedPrices, sortBy]);

  function toggleCat(cat: string) {
    setSelectedCategories((p) => p.includes(cat) ? p.filter((x) => x !== cat) : [...p, cat]);
    router.replace("/shop", { scroll: false });
  }
  function togglePrice(label: string) {
    setSelectedPrices((p) => p.includes(label) ? p.filter((x) => x !== label) : [...p, label]);
  }
  function clearAll() {
    setSelectedCategories([]);
    setSelectedPrices([]);
    router.replace("/shop", { scroll: false });
  }

  const hasFilters = selectedCategories.length > 0 || selectedPrices.length > 0;
  const allTags = [...selectedCategories, ...selectedPrices];

  const Filters = () => (
    <div className="space-y-6">
      {hasFilters && (
        <button onClick={clearAll} className="flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-700">
          <X size={14} /> Clear all
        </button>
      )}
      <div className="border-b border-zinc-100 pb-5">
        <button onClick={() => setCategoryOpen((p) => !p)} className="flex w-full items-center justify-between text-sm font-semibold uppercase tracking-widest text-zinc-700">
          Category {categoryOpen ? <Minus size={14} /> : <Plus size={14} />}
        </button>
        {categoryOpen && (
          <div className="mt-3 space-y-2.5">
            {[...new Set(products.map((p) => p.category))].map((cat) => (
              <label key={cat} className="flex cursor-pointer items-center gap-2.5 text-sm text-zinc-600 hover:text-zinc-900">
                <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => toggleCat(cat)} className="h-4 w-4 accent-black" />
                <span className="flex-1">{cat}</span>
                <span className="text-xs text-zinc-400">{products.filter((p) => p.category === cat).length}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      <div>
        <button onClick={() => setPriceOpen((p) => !p)} className="flex w-full items-center justify-between text-sm font-semibold uppercase tracking-widest text-zinc-700">
          Price {priceOpen ? <Minus size={14} /> : <Plus size={14} />}
        </button>
        {priceOpen && (
          <div className="mt-3 space-y-2.5">
            {PRICE_RANGES.map((r) => (
              <label key={r.label} className="flex cursor-pointer items-center gap-2.5 text-sm text-zinc-600 hover:text-zinc-900">
                <input type="checkbox" checked={selectedPrices.includes(r.label)} onChange={() => togglePrice(r.label)} className="h-4 w-4 accent-black" />
                {r.label}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900">Shop</h1>
            <p className="mt-1 text-sm text-zinc-500">{filtered.length} products{hasFilters ? " (filtered)" : ""}</p>
          </div>
          <button
            onClick={() => setMobileOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium shadow-sm lg:hidden"
          >
            <Filter size={16} /> Filters
            {hasFilters && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">{allTags.length}</span>}
          </button>
        </div>

        {hasFilters && (
          <div className="mb-6 flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <span key={tag} className="flex items-center gap-1.5 rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                {tag}
                <button onClick={() => selectedCategories.includes(tag) ? toggleCat(tag) : togglePrice(tag)}>
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="hidden self-start rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm lg:block">
            <Filters />
          </aside>

          <section>
            <div className="mb-5 flex justify-end">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="rounded-xl border border-zinc-200 bg-black px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white py-24 text-center">
                <p className="text-lg font-semibold text-zinc-700">No products found</p>
                <p className="mt-1 text-sm text-zinc-400">Try adjusting your filters</p>
                <button onClick={clearAll} className="mt-4 rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white">Clear Filters</button>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((product, idx) => (
                  <motion.article
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                    className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
                  >
                    <Link href={`/product/${product.slug}`}>
                      <div className="relative h-56 w-full overflow-hidden bg-zinc-100">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
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
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-zinc-900">{formatPrice(product.price)}</span>
                          {product.originalPrice && <span className="text-sm text-zinc-400 line-through">{formatPrice(product.originalPrice)}</span>}
                        </div>
                        <button
                          onClick={() => { addItem(product, "M"); toast.success("Added to cart!"); }}
                          className="flex items-center gap-1.5 rounded-lg bg-black px-3 py-2 text-xs font-semibold text-white transition hover:bg-zinc-700"
                        >
                          <ShoppingBag size={14} /> Add
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-80 overflow-y-auto bg-white p-6 shadow-2xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button onClick={() => setMobileOpen(false)} className="rounded-full p-2 hover:bg-zinc-100"><X size={20} /></button>
              </div>
              <Filters />
              <button onClick={() => setMobileOpen(false)} className="mt-8 w-full rounded-xl bg-black py-3 text-sm font-semibold text-white">
                Show {filtered.length} Results
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense>
      <ShopContent />
    </Suspense>
  );
}
