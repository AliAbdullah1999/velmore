import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./products";

interface WishlistStore {
  items: Product[];
  toggle: (product: Product) => void;
  has: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) =>
        set((s) => ({
          items: s.items.find((i) => i.id === product.id)
            ? s.items.filter((i) => i.id !== product.id)
            : [...s.items, product],
        })),
      has: (id) => get().items.some((i) => i.id === id),
    }),
    { name: "velmora-wishlist" }
  )
);
