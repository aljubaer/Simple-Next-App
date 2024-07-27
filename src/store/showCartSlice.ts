import { StateCreator } from "zustand";

type ShowCartState = {
  show: boolean;
};

type ShowCartAction = {
  open: () => void;
  close: () => void;
};

export type ShowCartSlice = ShowCartState & ShowCartAction;

const intialState: ShowCartState = {
  show: false,
};

export const createShowCartSlice: StateCreator<
  ShowCartSlice,
  [],
  [],
  ShowCartSlice
> = (set: any) => ({
  show: false,
  open: () => set({ show: true }),
  close: () => set({ show: false }),
});
