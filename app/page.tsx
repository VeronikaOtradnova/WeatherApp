'use client'

import { CurrentWeather } from "@/components/CurrentWeather/CurrentWeather";
import { SearchCity } from "@/components/SearchCity/SearchCity";

export default function Home() {
  return (
    <div className="d-flex flex-column justify-content-start align-items-stretch gap-4">
      <SearchCity />
      <CurrentWeather />
    </div>
  );
}
