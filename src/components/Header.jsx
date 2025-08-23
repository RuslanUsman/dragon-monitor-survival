import '../styles/Header.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from './Button';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const nav = [
  { to: '/', label: 'Главная' },
  { to: '/servers', label: 'Мониторинг серверов' },
  { to: '/publish', label: 'Опубликовать сервер' },
  { to: '/about', label: 'О проекте' },
];

export default function Header() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServers = async () => {
      if (query.trim().length < 1) {
        setResults([]);
        return;
      }

      const { data, error } = await supabase
        .from('servers')
        .select('id, title')
        .ilike('title', `%${query}%`)
        .limit(5);

      if (!error) {
        setResults(data || []);
      }
    };

    fetchServers();
  }, [query]);

  const handleSelect = (id) => {
    setQuery('');
    setResults([]);
    navigate(`/servers/${id}`);
  };

  return (
    <header className="header">
      <div className="header-inner w-full max-w-7xl mx-auto flex flex-col items-center gap-4 px-4 py-3">
        
        {/* Логотип */}
        <div className="header-logo text-center text-xl font-bold">
          <span>Dragan</span> Monitor Survival
        </div>

        {/* Навигация */}
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

        {/* Поиск — на мобильных всегда снизу */}
        <div className="relative w-full max-w-2xl mt-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск сервера..."
            className="search-input"
          />
          {results.length > 0 && (
            <ul className="absolute left-0 right-0 mt-1 max-h-60 overflow-y-auto rounded-md border border-primary/30 bg-gray-900 shadow-lg z-50">
              {results.map((server) => (
                <li
                  key={server.id}
                  onClick={() => handleSelect(server.id)}
                  className="cursor-pointer px-3 py-2 hover:bg-primary/20"
                >
                  {server.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
