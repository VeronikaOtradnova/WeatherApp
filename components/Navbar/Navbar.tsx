'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container">
        <Link className="navbar-brand" href="/">
          WeatherApp
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link ${pathname === '/' ? 'active' : ''}`} href="/">
                Главная
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${pathname === '/forecast' ? 'active' : ''}`} href="/forecast">
                Прогноз
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${pathname === '/favorites' ? 'active' : ''}`} href="/favorites">
                Избранное
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}