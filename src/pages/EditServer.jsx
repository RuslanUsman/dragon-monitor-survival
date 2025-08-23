import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import Button from '../components/Button';
import '../styles/EditServer.css';

export default function EditServer() {
  const { id } = useParams();
  const nav = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // логика сохранения изменений
  };

  if (!server) return <div>Загрузка...</div>;

  return (
    <div className="edit-server-container">
      <h2 className="edit-server-title">Редактировать сервер</h2>
      <form className="edit-server-form" onSubmit={handleSubmit}>
        <label>Название проекта</label>
        <input type="text" defaultValue={server.title} />

        <label>Новое изображение (JPG, необязательно)</label>
        <input type="file" accept="image/jpeg" />

        {server.image_url && (
          <img
            src={server.image_url}
            alt={server.title}
            className="edit-server-image-preview"
          />
        )}

        <label>Описание</label>
        <textarea defaultValue={server.description}></textarea>

        <label>Длительность вайпа (сек)</label>
        <input type="number" defaultValue={server.wipe_seconds} />

        <label>Сброс медали (сек)</label>
        <input type="number" defaultValue={server.reset_seconds} />

        <label>Дата и время запуска</label>
        <input type="datetime-local" defaultValue={server.launch_at} />

        <label>Telegram адрес проекта</label>
        <input type="url" defaultValue={server.telegram_url} />

        <div className="edit-server-actions">
          <Button type="submit">Сохранить</Button>
          <Button type="button" onClick={() => nav(-1)}>Отмена</Button>
        </div>
      </form>
    </div>
  );
}
