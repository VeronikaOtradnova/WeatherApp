import { useCurrentCityStore } from '@/stores/cityStore';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface IWeather {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
}

export function CurrentWeather() {
  const currentCity = useCurrentCityStore(store => store.currentCity);
  const [weather, setWeather] = useState<IWeather | null>(null);
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
      {
        (!currentCity || loading || error) && (
        <div className={`card card-blue d-flex justify-content-center align-items-center lead text-white ${error ? 'bg-transparent border-danger' : ''}`}>
          {!currentCity && !loading && !error && 'Выберите город, чтобы узнать погоду'}

          {loading && (
            <div className="spinner-border text-white" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}

          {error && (
            <div className="text-danger d-flex align-items-center">{error}</div>
          )}
        </div>)
      }
      {
        currentCity && !loading && !error &&
        <div className="card card-blue text-white">
          {
            weather && !loading && !error && (
              <>
                <div className="card-body p-4 d-flex flex-column justify-content-center align-items-center">
                  <div className='h1'>{weather.temp > 0 ? '+' : ''}{weather.temp}°C</div>
                  <div>{weather.description}</div>
                </div>
                <ul className="list-group list-group-flush d-flex flex-row justify-content-center">
                  <li className="list-group-item bg-transparent border-0 text-white">Влажность {weather.humidity}%</li>
                  <li className="list-group-item bg-transparent border-0 text-white">Ветер {weather.windSpeed}м/с</li>
                  <li className="list-group-item bg-transparent border-0 text-white">По ощущению {weather.feelsLike > 0 ? '+' : ''} {weather.feelsLike}°C</li>
                </ul>
              </>
            )
          }
        </div>
      }
    </>
  )
}