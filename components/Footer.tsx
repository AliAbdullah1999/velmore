// components/Footer.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white mt-auto">
      <div className="border-b border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Company Info */}
              <div>
                <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Velmora Store
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Your one-stop destination for quality products with exceptional customer service.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/shop" className="text-neutral-400 hover:text-white transition-colors">
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-neutral-400 hover:text-white transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-neutral-400 hover:text-white transition-colors">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-neutral-400 hover:text-white transition-colors">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Customer Service */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/faq" className="text-neutral-400 hover:text-white transition-colors">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/shipping" className="text-neutral-400 hover:text-white transition-colors">
                      Shipping Info
                    </Link>
                  </li>
                  <li>
                    <Link href="/returns" className="text-neutral-400 hover:text-white transition-colors">
                      Returns Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-neutral-400 hover:text-white transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact & Social */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
                <ul className="space-y-2 text-sm text-neutral-400">
                  <li>📍 Karachi, Pakistan</li>
                  <li>📞 +92 123 4567890</li>
                  <li>✉️ support@velmorastore.com</li>
                </ul>
                <div className="flex space-x-4 mt-4">
                  <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                    <FaFacebook size={20} />
                  </a>
                  <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                    <FaTwitter size={20} />
                  </a>
                  <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                    <FaInstagram size={20} />
                  </a>
                  <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                    <FaGithub size={20} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="py-6 text-center">
        <p className="text-sm text-neutral-400">
          © {currentYear} Velmora Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
}