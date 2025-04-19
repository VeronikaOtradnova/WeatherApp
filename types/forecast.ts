export interface IWeatherItem {
  id: number,
  date: string;
  time: string;
  temp: number;
  description: string;
  windSpeed: number;
  icon: string;
}

export interface ICurrentWeather {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
}