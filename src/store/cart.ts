import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/products";

export type CartItem = {
  slug: string;
  name: string;
  thumb: string;
  price?: number;
  qty: number;
};

type CartState = {
  items: CartItem[];
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (p: Product, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  count: () => number;
  total: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      open: false,
      setOpen: (v) => set({ open: v }),
      add: (p, qty = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.slug === p.slug);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.slug === p.slug ? { ...i, qty: i.qty + qty } : i,
              ),
              open: true,
            };
          }
          return {
            items: [
              ...s.items,
              { slug: p.slug, name: p.name, thumb: p.thumb, price: p.price, qty },
            ],
            open: true,
          };
        }),
      remove: (slug) => set((s) => ({ items: s.items.filter((i) => i.slug !== slug) })),
      setQty: (slug, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.slug === slug ? { ...i, qty: Math.max(1, qty) } : i))
            .filter((i) => i.qty > 0),
        })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((a, b) => a + b.qty, 0),
      total: () => get().items.reduce((a, b) => a + (b.price ?? 0) * b.qty, 0),
    }),
    { name: "thanh-ngoc-cart", skipHydration: true },
  ),
);
