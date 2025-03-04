import { create } from "zustand";

interface State {
  cbr: number;
  setCBRStore: (cbr: number) => void;
}

export const useCBRStore = create<State>()((set) => ({
  cbr: 1,
  setCBRStore: (cbr: number) => set({ cbr }),
}));
