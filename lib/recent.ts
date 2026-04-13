import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./products";

interface RecentStore {
  items: Product[];
  add: (product: Product) => void;
}

export const useRecentStore = create<RecentStore>()(
  persist(
    (set) => ({
      items: [],
      add: (product) =>
        set((s) => ({
          items: [product, ...s.items.filter((i) => i.id !== product.id)].slice(0, 6),
        })),
    }),
    { name: "velmora-recent" }
  )
);
