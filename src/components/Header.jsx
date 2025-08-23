import '../styles/Header.css';
import { NavLink } from 'react-router-dom';
import Button from './Button';

const nav = [
  { to: '/', label: 'Главная' },
  { to: '/servers', label: 'Мониторинг серверов' },
  { to: '/publish', label: 'Опубликовать сервер' },
  { to: '/about', label: 'О проекте' },
];

export default function Header() {
  return (
   <header className="header">
  <div className="header-inner flex flex-col items-center gap-4">
    <div className="header-logo text-center">
      <span>Dragan</span> Monitor Survival
    </div>
    <nav className="flex flex-wrap justify-center gap-3">
      {nav.map((n) => (
        <NavLink key={n.to} to={n.to}>
          {({ isActive }) => (
            <Button className={`${isActive ? 'border-primary' : 'border-primary/30'}`}>
              {n.label}
            </Button>
          )}
        </NavLink>
      ))}
    </nav>
  </div>
</header>

  );
}
