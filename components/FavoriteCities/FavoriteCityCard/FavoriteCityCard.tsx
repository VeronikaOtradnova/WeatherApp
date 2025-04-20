import { CurrentWeatherCard } from "@/components/CurrentWeatherCard/CurrentWeatherCard";
import { FavoriteButton } from "@/components/FavoriteButton/FavoriteButton";
import { StatusCard } from "@/components/StatusCard/StatusCard";
import { useCurrentWeather } from "@/hooks/useCurrentWeather";
import { ICity } from "@/types/city";

interface IProps {
  city: ICity;
}

export function FavoriteCityCard({ city }: IProps) {
  const { weather, loading, error } = useCurrentWeather(city);

  return (
    <div className="mb-4" key={city.id}>
      <h4>
        {city.name},
        <small className="text-body-secondary me-2"> {city.country}</small>
        <FavoriteButton city={city} />
      </h4>

      <StatusCard
        emptyMessage={''}
        error={error}
        loading={loading}
      />

      {
        !loading && !error && weather &&
        <CurrentWeatherCard weather={weather} />
      }
    </div>
  )
}