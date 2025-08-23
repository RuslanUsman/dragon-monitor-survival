import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import Button from '../components/Button';
import '../styles/Servers.css';

export default function Servers() {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    const loadServers = async () => {
      const { data, error } = await supabase
        .from('servers')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) setServers(data || []);
    };

    loadServers();
  }, []);

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

