'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import styles from './SearchCity.module.scss'
import { ICity } from "@/types/city";
import { useCurrentCityStore } from "@/stores/cityStore";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";

export function SearchCity() {
  const setCurrentCity = useCurrentCityStore(store => store.setCurrentCity);

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ICity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!query) {
      setSearchResults([]);
    }

    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      setError('');
      setLoading(true);

      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
      axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${debouncedQuery}&limit=10&appid=${apiKey}`)
        .then(resp => {
          const result = resp.data
            .filter((city: any) => city.local_names?.ru)
            .map((city: any): ICity => ({
              id: `${city.lat.toFixed(5)}_${city.lon.toFixed(5)}`,
              lat: city.lat,
              lon: city.lon,
              name: city.local_names.ru,
              country: city.country,
            }))
          setLoading(false);
          setSearchResults(result);
        })
        .catch(err => {
          setLoading(false);
          setError('Ошибка при загрузке городов')
        })
    }
  }, [debouncedQuery]);

  const cityItemHandler = (city:ICity) => {
    setCurrentCity(city);
    setQuery('');
    setDebouncedQuery('');
    setSearchResults([]);
  }

  return (
    <div className="position-relative">
      <input
        type="search"
        className={`form-control shadow-none ${styles.customInput} ${(debouncedQuery || searchResults.length > 0) ? styles.openDropdown : ''}`}
        placeholder="Введите город"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {(debouncedQuery || searchResults.length > 0) && (
        <ul
          className={`list-group position-absolute w-100 rounded-0 rounded-bottom ${styles.list}`}
          style={{ zIndex: 1000 }}
        >
          {loading && (
            <li className="list-group-item d-flex justify-content-center align-items-center">
              <div className="spinner-border spinner-border-sm text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </li>
          )}

          {error && (
            <li className="list-group-item text-danger d-flex align-items-center">{error}</li>
          )}

          {!loading && !error && debouncedQuery && searchResults.length === 0 && (
            <li className="list-group-item d-flex align-items-center">Ничего не найдено</li>
          )}

          {searchResults.length > 0 && !error && !loading && (searchResults.map((city) => (
            <li
              key={city.id}
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              onClick={() => cityItemHandler(city)}
            >
              <div>{city.name}, {city.country}</div>
              <FavoriteButton city={city} />
            </li>
          )))}
        </ul>
      )}
    </div>
  );
}