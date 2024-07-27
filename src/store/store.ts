// import { create } from "zustand";

// type ShowCartStore = {
//   show: boolean;
//   open: () => void;
//   close: () => void;
// };

// type CartItemStore = {
//   count: number;
//   increaseItem: (val: number) => void;
// };

// export const useCartItemStore = create<CartItemStore>((set) => ({
//   count: 0,
//   increaseItem: (val) => set((state) => ({ count: state.count + val })),
// }));

// export const useShowCartStore = create<ShowCartStore>((set) => ({
//   show: false,
//   open: () => set({ show: true }),
//   close: () => set({ show: false })
// }));

import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { Store } from "@/types/store";

import { createCartSlice } from "./cartSlice";
import { createShowCartSlice } from "./showCartSlice";

export const useStore = create<Store>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer((...a) => ({
          ...createCartSlice(...a),
          ...createShowCartSlice(...a),
        }))
      ),
      {
        name: "local-storage",
      }
    )
  )
);
