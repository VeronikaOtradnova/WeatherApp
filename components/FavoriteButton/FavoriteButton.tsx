'use client';

import { useFavoritesStore } from "@/stores/favoritesStore";
import { ICity } from "@/types/city";
import { useState, useEffect, MouseEvent } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import styles from './FavoriteButton.module.scss'

interface FavoriteButtonProps {
  city: ICity;
}

export function FavoriteButton({ city }: FavoriteButtonProps) {
  const { favs, addFav, removeFav } = useFavoritesStore();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(favs.map(fav => fav.id).includes(city.id));
  }, [favs, city]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (isFavorite) {
      removeFav(city.id);
    } else {
      addFav(city);
    }
  };

  return (
    <button
      className="btn p-0 border-0 bg-transparent"
      onClick={handleClick}
      aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
    >
      <i
        className={`bi ${styles.icon} ${isFavorite ? `bi bi-star-fill ${styles.fav}` : `bi bi-star ${styles.notFav}`}`}
      />
    </button>
  );
}