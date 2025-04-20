import { ICurrentWeather } from "@/types/forecast"

interface IProps {
  weather: ICurrentWeather;
}

export function CurrentWeatherCard({ weather }: IProps) {
  return (
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
  )
}