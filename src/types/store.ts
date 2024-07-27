import { CartSlice } from "@/store/cartSlice";
import { ShowCartSlice } from "@/store/showCartSlice";


export type Store = CartSlice & ShowCartSlice;