import { create } from "zustand";

interface State {
  pendingForm: boolean;
  setPendingFormStore: (pendingForm: boolean) => void;
}

export const usePendingFormtore = create<State>()((set) => ({
  pendingForm: false,
  setPendingFormStore: (pendingForm: boolean) => set({ pendingForm }),
}));
