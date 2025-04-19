'use client'

import { useCurrentCityStore } from '@/stores/cityStore';
import styles from './ForecastWeather.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { StatusCard } from '../StatusCard/StatusCard';
import { IWeatherItem } from '@/types/forecast';
import { ForecastWeatherCard } from './ForecastWeatherCard/ForecastWeatherCard';

export function ForecastWeather() {
  const currentCity = useCurrentCityStore(store => store.currentCity);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [forecastByDate, setForecastByDate] = useState<Record<string, IWeatherItem[]> | null>(null);

  useEffect(() => {
    if (!currentCity) return;

    setError('');
    setLoading(true);

    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    axios.get('https://api.openweathermap.org/data/2.5/forecast', {
      params: {
        lat: currentCity.lat,
        lon: currentCity.lon,
        appid: apiKey,
        units: 'metric',
        lang: 'ru',
      }
    })
      .then(resp => {
        const list = resp.data.list.map((item: any): IWeatherItem => ({
          id: item.dt,
          date: item.dt_txt.split(' ')[0],
          time: item.dt_txt.split(' ')[1],
          temp: Math.round(item.main.temp),
          description: item.weather[0].description,
          windSpeed: Math.round(item.wind.speed),
          icon: item.weather[0].icon,
        }))

        const groupedByDate = list.reduce((acc: Record<string, IWeatherItem[]>, item: IWeatherItem) => {
          const date = item.date;
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(item);
          return acc;
        }, {} as Record<string, IWeatherItem[]>);

        setForecastByDate(groupedByDate);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError('Ошибка при загрузке погоды');
      })
  }, [currentCity])

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}.${month}`;
  }

  return (
    <>
      <h3>
        Погода на несколько дней
        {currentCity && ','}
        <small className="text-body-secondary"> {currentCity?.name}</small>
      </h3>

      <StatusCard
        emptyMessage={currentCity ? '' : 'Выберите город, чтобы узнать погоду'}
        error={error}
        loading={loading}
      />

      {
        currentCity && !loading && !error && forecastByDate &&
        <>{
          Object.entries(forecastByDate).map(([date, forecasts]) => (
            <div className="mb-4" key={date}>
              <h4>{formatDate(date)}</h4>

              <div className={`d-flex overflow-auto gap-3 mt-2 pb-2 ${styles.scroll}`}>
                {forecasts.map(forecast => <ForecastWeatherCard forecast={forecast} key={forecast.id} />)}
              </div>
            </div>
          ))
        }</>
      }
    </>
  )
}