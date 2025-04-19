import { IWeatherItem } from '@/types/forecast';
import styles from './ForecastWeatherCard.module.scss';

interface IProps {
  forecast: IWeatherItem;
}

export function ForecastWeatherCard({ forecast }: IProps) {
  return (
    <div className={`card card-blue text-white border-light p-2 ${styles.card}`} key={forecast.id}>
      <div className="fw-bold">{forecast.time.slice(0, 5)}</div>
      <img
        src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
        alt={forecast.description}
        width={48}
        height={48}
      />
      <div className="fs-4">{forecast.temp > 0 ? '+' : ''}{forecast.temp}°C</div>
      <div className="small">{forecast.description}</div>
      <div className="small">Ветер {forecast.windSpeed} м/с</div>
    </div>
  )
}