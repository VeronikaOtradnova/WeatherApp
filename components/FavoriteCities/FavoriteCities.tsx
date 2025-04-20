'use client'

import { useFavoritesStore } from "@/stores/favoritesStore";
import { FavoriteCityCard } from "./FavoriteCityCard/FavoriteCityCard";

export function FavoriteCities() {
  const favs = useFavoritesStore(store => store.favs)

  return (
    <>
      {
        favs.map(city => <FavoriteCityCard city={city} key={city.id} />)
      }
    </>
  )
}