import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import Button from '../components/Button';
import '../styles/Servers.css';

export default function Servers() {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    loadServers();

    // автообновление каждую минуту
    const interval = setInterval(loadServers, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  async function loadServers() {
    const { data, error } = await supabase
      .from('servers')
      .select('*')
      .order('launch_at', { ascending: true }); // сортировка по дате запуска

    if (error) {
      console.error(error);
      return;
    }

    const now = new Date();

    const updated = data
      .map((s) => {
        const launch = new Date(s.launch_at);
        const end = new Date(launch.getTime() + (s.wipe_seconds || 0) * 1000);

        if (now < launch) {
          // ещё не запущен
          return {
            ...s,
            status: `Запустится через ${formatTime(launch - now)}`,
            remove: false
          };
        } else if (now >= launch && now < end) {
          // запущен, идёт вайп
          return {
            ...s,
            status: `До конца вайпа: ${formatTime(end - now)} | Осталось до закрытия: ${formatTime(end - now)}`,
            remove: false
          };
        } else {
          // вайп завершён
          return { ...s, remove: true };
        }
      })
      .filter((s) => !s.remove);

    setServers(updated);

    // удаляем завершённые
    const toDelete = data.filter((s) => {
      const launch = new Date(s.launch_at);
      const end = new Date(launch.getTime() + (s.wipe_seconds || 0) * 1000);
      return now >= end;
    });

    for (const srv of toDelete) {
      await supabase.from('servers').delete().eq('id', srv.id);
    }
  }

  function formatTime(ms) {
    const totalMinutes = Math.floor(ms / (1000 * 60));
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;

    if (days > 0) {
      return `${days}д ${hours}ч ${minutes}м`;
    }
    return `${hours}ч ${minutes}м`;
  }

  return (
    <section className="servers-section">
      {servers.length === 0 && (
        <div className="server-card">
          <div className="server-info">
            <div className="server-title">Серверов пока нет</div>
          </div>
        </div>
      )}

      {servers.map((s) => (
        <div key={s.id} className="server-card">
          <div className="server-info">
            <div className="server-title">{s.title}</div>
            <div className="server-date">
              Запуск: {new Date(s.launch_at).toLocaleString()}
            </div>
            <div className="server-status">{s.status}</div>
            <NavLink to={`/servers/${s.id}`}>
              <Button>Перейти</Button>
            </NavLink>
          </div>
          {s.image_url && (
            <img
              src={s.image_url}
              alt={s.title}
              className="server-image"
            />
          )}
        </div>
      ))}
    </section>
  );
}
