import { ForecastWeather } from "@/components/ForecastWeather/ForecastWeather";
import { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'WeatherApp | Прогноз',
  };
};

export default function Forecast() {
  return (
    <ForecastWeather />
  );
}
