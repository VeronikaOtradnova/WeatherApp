import Navbar from "@/components/Navbar/Navbar";
import "./globals.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <Navbar />
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
