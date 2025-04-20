import { create } from "zustand";

interface State {
  cityState: number;
  setCityState: (cbr: number) => void;
}

export const useCityState = create<State>()((set) => ({
  cityState: 1,
  setCityState: (cityState: number) => set({ cityState }),
}));
