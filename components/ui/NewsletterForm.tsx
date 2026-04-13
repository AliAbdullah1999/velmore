"use client";

export default function NewsletterForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <input
        type="email"
        placeholder="your@email.com"
        className="flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-black"
      />
      <button
        type="submit"
        className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
      >
        Subscribe
      </button>
    </form>
  );
}
