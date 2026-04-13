import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const footerLinks = {
  shop: ["New Arrivals", "Best Sellers", "Gift Guide", "Sale"],
  support: ["FAQ", "Shipping", "Returns", "Contact"],
  socials: ["Instagram", "Twitter", "Facebook", "YouTube"],
};

export default function Footer() {
  return (
    <footer className="bg-black text-zinc-200">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Velmora</h3>
            <p className="text-sm text-zinc-300">
              Crafted for Everyday Luxury. Minimalist design with premium utility.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-300">Shop</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              {footerLinks.shop.map((item) => (
                <li key={item}>
                  <Link href="/shop" className="hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-300">Support</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              {footerLinks.support.map((item) => (
                <li key={item}>
                  <Link href="/" className="hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-300">Socials</h4>
            <div className="flex items-center gap-3 text-zinc-400">
              <Link href="https://instagram.com" aria-label="Instagram" className="hover:text-white">
                <Instagram size={18} />
              </Link>
              <Link href="https://twitter.com" aria-label="Twitter" className="hover:text-white">
                <Twitter size={18} />
              </Link>
              <Link href="https://facebook.com" aria-label="Facebook" className="hover:text-white">
                <Facebook size={18} />
              </Link>
              <Link href="https://youtube.com" aria-label="YouTube" className="hover:text-white">
                <Youtube size={18} />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-zinc-400">
          © {new Date().getFullYear()} Velmora. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
