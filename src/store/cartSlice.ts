import { Product, CartProduct } from "@/types/product";
import { StateCreator } from "zustand";

type CartState = {
  products: CartProduct[];
  total: number;
};

type CartActions = {
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  increaseQuatity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  getProductById: (productId: string) => CartProduct | undefined;
  setTotal: (total: number) => void;
  reset: () => void;
};

export type CartSlice = CartState & CartActions;

const initialState: CartState = {
  products: [],
  total: 0,
};
export const createCartSlice: StateCreator<CartSlice, [], [], CartSlice> = (
  set: any,
  get: any
) => ({
  ...initialState,
  increaseQuatity: (productId: string) =>
    set((state: any) => {
      const foundProduct = state.products.find(
        (product: Product) => product.id === productId
      );
      if (foundProduct) {
        foundProduct.qty += 1;
      }
    }),

  decreaseQuantity: (productId: string) =>
    set((state: any) => {
      const foundIndex = state.products.findIndex(
        (product: CartProduct) => product.id === productId
      );

      if (foundIndex !== -1) {
        if (state.products[foundIndex].qty === 1) {
          state.products.splice(foundIndex, 1);
        } else {
          state.products[foundIndex].qty -= 1;
        }
      }
    }),

  addProduct: (product: Product) =>
    set((state: any) => {
      const foundProduct = state.products.find(
        (_product: Product) => _product.id === product.id
      );
      if (!foundProduct) state.products.push({ ...product, qty: 1 });
    }),

  removeProduct: (productId: string) =>
    set((state: any) => {
      state.products = state.products.filter(
        (product: CartProduct) => product.id !== productId
      );
    }),

  getProductById: (productId: string) =>
    get().products.find((product: Product) => product.id === productId),

  setTotal: (total: number) =>
    set((state: any) => {
      state.total = total;
    }),

  reset: () => set(() => initialState),
});
