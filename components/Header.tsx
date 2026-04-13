"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag, Search, Heart } from "lucide-react";
import { useCartStore } from "@/lib/cart";
import { useWishlistStore } from "@/lib/wishlist";
import { motion, AnimatePresence } from "framer-motion";
import CartDrawer from "@/components/ui/CartDrawer";
import SearchModal from "@/components/ui/SearchModal";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/#categories" },
  { label: "About", href: "/#about" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const totalItems = useCartStore((s) => s.totalItems);
  const wishlistCount = useWishlistStore((s) => s.items.length);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cmd/Ctrl+K opens search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const cartCount = mounted ? totalItems() : 0;
  const wCount = mounted ? wishlistCount : 0;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled || menuOpen
            ? "bg-black/95 shadow-sm backdrop-blur-lg border-b border-black/5"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className={`text-xl font-bold tracking-widest uppercase transition-colors duration-300 ${scrolled || menuOpen ? "text-zinc-900" : "text-white"}`}>
            Velmora
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`text-sm font-medium transition-colors duration-300 ${scrolled || menuOpen ? "text-zinc-600 hover:text-zinc-950" : "text-white/90 hover:text-white"}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-0.5">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className={`group relative rounded-full p-2 transition-colors duration-300 ${scrolled || menuOpen ? "text-zinc-700 hover:bg-zinc-100" : "text-white hover:bg-white/10"}`}
            >
              <Search size={18} />
              <span className="absolute -bottom-7 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-white group-hover:block">
                ⌘K
              </span>
            </button>

            {/* Wishlist */}
            <Link href="/wishlist" aria-label="Wishlist" className={`relative rounded-full p-2 transition-colors duration-300 ${scrolled || menuOpen ? "text-zinc-700 hover:bg-zinc-100" : "text-white hover:bg-white/10"}`}>
              <Heart size={18} />
              {wCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {wCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Cart"
              className={`relative rounded-full p-2 transition-colors duration-300 ${scrolled || menuOpen ? "text-zinc-700 hover:bg-zinc-100" : "text-white hover:bg-white/10"}`}
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            <button
              className={`rounded-md p-2 transition-colors duration-300 md:hidden ${scrolled || menuOpen ? "text-zinc-700" : "text-white"}`}
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-black/5 bg-black md:hidden"
            >
              <div className="px-4 py-3 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link href="/wishlist" onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
                  Wishlist {wCount > 0 && <span className="ml-1 rounded-full bg-red-100 px-1.5 py-0.5 text-xs font-semibold text-red-600">{wCount}</span>}
                </Link>
                <Link href="/cart" onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
                  Cart {cartCount > 0 && <span className="ml-1 rounded-full bg-zinc-100 px-1.5 py-0.5 text-xs font-semibold text-zinc-700">{cartCount}</span>}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
