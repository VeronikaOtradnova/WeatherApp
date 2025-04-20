import { FavoriteCities } from "@/components/FavoriteCities/FavoriteCities";
import { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'WeatherApp | Избранное',
  };
};

export default function Favorites() {
  return (
    <FavoriteCities />
  );
}
