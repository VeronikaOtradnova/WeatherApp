'use client'

import { useFavoritesStore } from "@/stores/favoritesStore";
import { FavoriteCityCard } from "./FavoriteCityCard/FavoriteCityCard";
import { StatusCard } from "../StatusCard/StatusCard";

export function FavoriteCities() {
  const favs = useFavoritesStore(store => store.favs)

  return (
    <>
      {
        favs.length > 0 ?
        favs.map(city => <FavoriteCityCard city={city} key={city.id} />):
        <StatusCard 
          emptyMessage="В избранном ничего нет"
          loading={false}
          error=""
        />
      }
    </>
  )
}