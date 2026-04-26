"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag, Search, Heart, User } from "lucide-react";
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
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled || menuOpen
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className={`text-display-sm font-bold tracking-wider transition-colors duration-300 ${
                scrolled || menuOpen ? "text-neutral-900" : "text-white"
              } hover:text-brand-secondary`}
            >
              Velmora
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden items-center gap-8 md:flex"
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className={`text-body-sm font-medium transition-all duration-300 relative group ${
                    scrolled || menuOpen
                      ? "text-neutral-700 hover:text-brand-secondary"
                      : "text-white hover:text-white"
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-secondary transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-1"
          >
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className={`group relative rounded-full p-3 transition-all duration-300 ${
                scrolled || menuOpen
                  ? "text-neutral-700 hover:bg-neutral-100 hover:text-brand-secondary"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <Search size={20} />
              <motion.span
                initial={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute -bottom-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-800 px-2 py-1 text-xs text-white shadow-lg group-hover:block"
              >
                ⌘K
              </motion.span>
            </motion.button>

            {/* Account */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Account"
              className={`group relative rounded-full p-3 transition-all duration-300 ${
                scrolled || menuOpen
                  ? "text-neutral-700 hover:bg-neutral-100 hover:text-brand-secondary"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <User size={20} />
            </motion.button>

            {/* Wishlist */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className={`relative rounded-full p-3 transition-all duration-300 ${
                  scrolled || menuOpen
                    ? "text-neutral-700 hover:bg-neutral-100 hover:text-brand-secondary"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <Heart size={20} />
                {wCount > 0 && (
                  <motion.span
                    key={wCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-lg"
                  >
                    {wCount}
                  </motion.span>
                )}
              </Link>
            </motion.div>

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCartOpen(true)}
              aria-label="Cart"
              className={`relative rounded-full p-3 transition-all duration-300 ${
                scrolled || menuOpen
                  ? "text-neutral-700 hover:bg-neutral-100 hover:text-brand-secondary"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-secondary text-xs font-bold text-white shadow-lg"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className={`rounded-lg p-2 transition-all duration-300 md:hidden ${
                scrolled || menuOpen
                  ? "text-neutral-700 hover:bg-neutral-100"
                  : "text-white hover:bg-white/10"
              }`}
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: menuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden bg-white/95 backdrop-blur-xl md:hidden"
            >
              <div className="px-4 py-6 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-lg px-4 py-3 text-body-md font-medium text-neutral-700 hover:bg-neutral-50 hover:text-brand-secondary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <div className="border-t border-neutral-200 pt-4 mt-4 space-y-2">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Link
                      href="/wishlist"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between rounded-lg px-4 py-3 text-body-md font-medium text-neutral-700 hover:bg-neutral-50 hover:text-brand-secondary transition-colors"
                    >
                      Wishlist
                      {wCount > 0 && (
                        <span className="badge badge-secondary">{wCount}</span>
                      )}
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Link
                      href="/cart"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between rounded-lg px-4 py-3 text-body-md font-medium text-neutral-700 hover:bg-neutral-50 hover:text-brand-secondary transition-colors"
                    >
                      Cart
                      {cartCount > 0 && (
                        <span className="badge badge-primary">{cartCount}</span>
                      )}
                    </Link>
                  </motion.div>
                </div>
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