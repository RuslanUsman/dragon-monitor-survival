import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Button from '../components/Button';
import '../styles/ServerDetails.css';

export default function ServerDetails() {
  const { id } = useParams();
  const [server, setServer] = useState(null);

  useEffect(() => {
    const loadServer = async () => {
      const { data, error } = await supabase
        .from('servers')
        .select('*')
        .eq('id', id)
        .single();

      if (!error) setServer(data);
    };

    loadServer();
  }, [id]);

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
              <strong>Сброс медали:</strong> {server.reset_seconds}s ({(server.reset_seconds / 3600).toFixed(1)} ч)
            </>
          )}
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

