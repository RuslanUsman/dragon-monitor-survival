import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Button from '../components/Button';
import '../styles/ServerDetails.css';

export default function ServerDetails() {
  const { id } = useParams();
  const [server, setServer] = useState(null);
  const [statusText, setStatusText] = useState('');

  useEffect(() => {
    const loadServer = async () => {
      const { data, error } = await supabase
        .from('servers')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) {
        setServer(data);
        updateStatus(data);
      }
    };

    loadServer();

    // обновляем статус каждую минуту
    const interval = setInterval(() => {
      if (server) updateStatus(server);
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [id, server]);

  function updateStatus(srv) {
    const now = new Date();
    const launch = new Date(srv.launch_at);
    const end = new Date(launch.getTime() + srv.wipe_seconds * 1000);

    if (now < launch) {
      setStatusText(`Запустится через ${formatTime(launch - now)}`);
    } else if (now >= launch && now < end) {
      setStatusText(
        `До конца вайпа: ${formatTime(end - now)} | Осталось до закрытия: ${formatTime(end - now)}`
      );
    } else {
      setStatusText('Вайп завершён');
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

  if (!server) return <div>Загрузка...</div>;

  return (
    <div className="server-details">
      {server.image_url && (
        <img
          src={server.image_url}
          alt={server.title}
          className="server-image-large"
        />
      )}
      <div className="server-info-block">
        <div className="server-title">{server.title}</div>
        <div className="server-meta">
          <strong>Запуск:</strong> {new Date(server.launch_at).toLocaleString()}<br />
          <strong>Длительность вайпа:</strong> {server.wipe_seconds}s ({(server.wipe_seconds / 3600).toFixed(1)} ч)<br />
          {server.reset_seconds && (
            <>
              <strong>Сброс медали:</strong> {server.reset_seconds}s ({(server.reset_seconds / 3600).toFixed(1)} ч)<br />
            </>
          )}
          <strong>Статус:</strong> {statusText}
        </div>
        {server.description && (
          <div className="server-meta">{server.description}</div>
        )}
        {server.telegram_url && (
          <div className="server-actions">
            <a href={server.telegram_url} target="_blank" rel="noreferrer">
              <Button>Перейти в Telegram проекта</Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
