'use client';

import { useCurrentCityStore } from '@/stores/cityStore';
import { StatusCard } from '../StatusCard/StatusCard';
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';
import { useCurrentWeather } from '@/hooks/useCurrentWeather';
import { CurrentWeatherCard } from '../CurrentWeatherCard/CurrentWeatherCard';

export function CurrentWeather() {
  const currentCity = useCurrentCityStore(store => store.currentCity);

  const {weather, loading, error} = useCurrentWeather(currentCity);

  return (
    <>
      <h3>
        Погода сейчас
        {
          currentCity &&
          <>
            ,
            <small className="text-body-secondary me-2"> {currentCity.name}</small>
            <FavoriteButton city={currentCity} />
          </>
        }
      </h3>

      <StatusCard
        emptyMessage={currentCity ? '' : 'Выберите город, чтобы узнать погоду'}
        error={error}
        loading={loading}
      />

      {
        currentCity && !loading && !error && weather &&
        <CurrentWeatherCard weather={weather} />
      }
    </>
  )
}