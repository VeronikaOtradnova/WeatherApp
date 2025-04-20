import Navbar from "@/components/Navbar/Navbar";
import "./globals.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WeatherApp",
  description: "Приложение прогноза погоды: узнайте текущую погоду и прогноз на несколько дней для любого города.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <Navbar />
        <main className="container d-flex flex-column justify-content-start align-items-stretch gap-4">
          {children}
        </main>
      </body>
    </html>
  );
}
