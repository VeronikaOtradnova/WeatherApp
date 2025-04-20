import { ICity } from "@/types/city";
import { ICurrentWeather } from "@/types/forecast";
import axios from "axios";
import { useEffect, useState } from "react";

export function useCurrentWeather(city: ICity | null) {
  const [weather, setWeather] = useState<ICurrentWeather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!city) return;

    setError('');
    setLoading(true);

    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        lat: city.lat,
        lon: city.lon,
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
  }, [city])

  return {
    error, loading, weather
  }
}