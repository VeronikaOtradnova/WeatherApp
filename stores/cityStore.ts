import { ICity } from "@/types/city";
import { create } from "zustand";

interface ICurrentCityState {
  currentCity: ICity | null;
  setCurrentCity: (city: ICity) => void;
}

export const useCurrentCityStore = create<ICurrentCityState>((set) => ({
  currentCity: null,
  setCurrentCity: (city) => set({ currentCity: city }),
}));