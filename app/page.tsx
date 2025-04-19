import { CurrentWeather } from "@/components/CurrentWeather/CurrentWeather";
import { SearchCity } from "@/components/SearchCity/SearchCity";

export default function Home() {
  return (
    <>
      <SearchCity />
      <CurrentWeather />
    </>
  )
}
