import { ICity } from '@/types/city';
import { create } from 'zustand';

interface IFavsState {
  favs: ICity[];
  addFav: (city: ICity) => void;
  removeFav: (cityId: string) => void;
}

export const useFavoritesStore = create<IFavsState>((set) => ({
  favs: [],
  addFav: (city) => set((state) => ({
    favs: [...state.favs, city]
  })),
  removeFav: (cityId) => set((state) => ({
    favs: state.favs.filter((city) => city.id !== cityId)
  }))
}))