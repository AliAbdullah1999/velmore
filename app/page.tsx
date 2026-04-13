import HeroSection from "@/components/sections/HeroSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import FeaturedProductsSection from "@/components/sections/FeaturedProductsSection";
import NewsletterForm from "@/components/ui/NewsletterForm";

const perks = [
  { icon: "🚚", title: "Free Shipping", desc: "On orders over $150" },
  { icon: "↩️", title: "Easy Returns", desc: "30-day hassle-free" },
  { icon: "🔒", title: "Secure Payments", desc: "SSL encrypted" },
  { icon: "✦", title: "Premium Quality", desc: "Curated essentials" },
];

export default function Home() {
  return (
    <div className="bg-zinc-50 text-zinc-900">
      <HeroSection />

      <div className="border-y border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-zinc-100 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
          {perks.map((perk) => (
            <div key={perk.title} className="flex flex-col items-center gap-1 px-4 py-6 text-center sm:flex-row sm:gap-3 sm:text-left">
              <span className="text-2xl">{perk.icon}</span>
              <div>
                <p className="text-sm font-semibold text-zinc-900">{perk.title}</p>
                <p className="text-xs text-zinc-500">{perk.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CategoriesSection />
      <FeaturedProductsSection />

      <section id="about" className="bg-black py-24 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-300">Our Story</p>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white">About Velmora</h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-300">
            Velmora brings together premium materials, thoughtful design, and a minimal aesthetic for the modern wardrobe.
            Our collections are made for life's core moments — built to elevate every day.
          </p>
        </div>
      </section>

      <section className="bg-zinc-100 py-20">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">Stay in the loop</p>
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900">Join the Velmora Circle</h2>
          <p className="mb-8 text-zinc-600">Get early access to new drops, exclusive offers, and style inspiration.</p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
