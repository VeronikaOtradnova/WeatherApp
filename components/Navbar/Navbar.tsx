'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.scss'

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark mb-4 ${styles.navbar}`}>
      <div className="container flex-row gap-5">
        <Link className="navbar-brand" href="/">
          WeatherApp
        </Link>

        <ul className="navbar-nav ms-auto flex-row justify-content-between gap-3">
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
    </nav>
  );
}