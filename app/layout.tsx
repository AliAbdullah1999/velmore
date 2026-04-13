import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Velmora | Crafted for Everyday Luxury",
  description: "Minimalist premium store for curated essentials.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-zinc-50" suppressHydrationWarning={true}>
        <Header />
        <main className="mt-16 flex-1">{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: { background: "#18181b", color: "#fff", borderRadius: "12px", fontSize: "14px" },
            success: { iconTheme: { primary: "#22c55e", secondary: "#fff" } },
          }}
        />
      </body>
    </html>
  );
}
