import { ICity } from '@/types/city';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IFavsState {
  favs: ICity[];
  addFav: (city: ICity) => void;
  removeFav: (cityId: string) => void;
}

export const useFavoritesStore = create<IFavsState>()(
  persist(
    (set) => ({
      favs: [],
      addFav: (city) => set((state) => ({
        favs: [...state.favs, city]
      })),
      removeFav: (cityId) => set((state) => ({
        favs: state.favs.filter((city) => city.id !== cityId)
      }))
    }),
    {name: 'favorites-store'}
  )
)