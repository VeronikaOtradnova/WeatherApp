'use client';

import { useCurrentCityStore } from '@/stores/cityStore';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { StatusCard } from '../StatusCard/StatusCard';
import { ICurrentWeather } from '@/types/forecast';

export function CurrentWeather() {
  const currentCity = useCurrentCityStore(store => store.currentCity);
  const [weather, setWeather] = useState<ICurrentWeather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!currentCity) return;

    setError('');
    setLoading(true);

    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        lat: currentCity.lat,
        lon: currentCity.lon,
        appid: apiKey,
        units: 'metric',
        lang: 'ru',
      }
    })
      .then(resp => {
        setWeather({
          temp: Math.round(resp.data.main.temp),
          feelsLike: Math.round(resp.data.main.feels_like),
          humidity: resp.data.main.humidity,
          windSpeed: resp.data.wind.speed,
          description: resp.data.weather[0].description,
        })
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError('Ошибка при загрузке погоды')
      })
  }, [currentCity])

  return (
    <>
      <h3>
        Погода сейчас
        {currentCity && ','}
        <small className="text-body-secondary"> {currentCity?.name}</small>
      </h3>

      <StatusCard
        emptyMessage={currentCity ? '' : 'Выберите город, чтобы узнать погоду'}
        error={error}
        loading={loading}
      />

      {
        currentCity && !loading && !error && weather &&
        <div className="card card-blue text-white">
          <div className="card-body p-4 d-flex flex-column justify-content-center align-items-center">
            <div className='h1'>{weather.temp > 0 ? '+' : ''}{weather.temp}°C</div>
            <div>{weather.description}</div>
          </div>
          <ul className="list-group list-group-flush d-flex flex-row justify-content-center">
            <li className="list-group-item bg-transparent border-0 text-white">Влажность {weather.humidity}%</li>
            <li className="list-group-item bg-transparent border-0 text-white">Ветер {weather.windSpeed}м/с</li>
            <li className="list-group-item bg-transparent border-0 text-white">По ощущению {weather.feelsLike > 0 ? '+' : ''} {weather.feelsLike}°C</li>
          </ul>
        </div>
      }
    </>
  )
}