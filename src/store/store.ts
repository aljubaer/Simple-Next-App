import { create } from "zustand";

type ShowCartStore = {
  show: boolean;
  open: () => void;
  close: () => void;
};

type CartItemStore = {
  count: number;
  increaseItem: () => void;
};

export const useCartItemStore = create<CartItemStore>((set) => ({
  count: 0,
  increaseItem: () => set((state) => ({ count: state.count + 1 })),
}));

export const useShowCartStore = create<ShowCartStore>((set) => ({
  show: false,
  open: () => set({ show: true }),
  close: () => set({ show: false })
}));
