import { ICity } from "@/types/city";
import { create } from "zustand";
import { persist } from 'zustand/middleware';

interface ICurrentCityState {
  currentCity: ICity | null;
  setCurrentCity: (city: ICity) => void;
}

export const useCurrentCityStore = create<ICurrentCityState>()(
  persist(
    (set) => ({
      currentCity: null,
      setCurrentCity: (city) => set({ currentCity: city }),
    }),
    {name: 'current-city-storage'}
  )
);