import { create } from "zustand";

interface State {
  eur: number;
  setEURStore: (eur: number) => void;
}

export const useEURStore = create<State>()((set) => ({
  eur: 91.3,
  setEURStore: (eur: number) => set({ eur }),
}));
