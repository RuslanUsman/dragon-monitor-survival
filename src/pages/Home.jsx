import { NavLink } from 'react-router-dom';
import Button from '../components/Button';
import '../styles/Home.css';

export default function Home() {
  const items = [
    { to: '/servers', label: 'Мониторинг серверов' },
    { to: '/publish', label: 'Опубликовать сервер' },
    { to: '/about', label: 'О проекте' },
  ];

  return (
    <section className="home-section">
      {items.map((i) => (
        <NavLink key={i.to} to={i.to}>
          <div className="home-card">
            <div className="home-card-title">{i.label}</div>
            <Button>Перейти</Button>
          </div>
        </NavLink>
      ))}
    </section>
  );
}
