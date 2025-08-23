import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import Button from '../components/Button';
import '../styles/AddServer.css';

export default function AddServer() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    wipe_seconds: 0,
    reset_seconds: 0,
    launch_at: '',
    telegram_url: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Получаем текущего пользователя
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      alert('Необходимо войти в аккаунт');
      setLoading(false);
      return;
    }

    let image_url = null;
    let image_path = null;

    // 2. Если есть картинка — загружаем в Storage
    if (imageFile) {
      image_path = `${user.id}/${Date.now()}_${imageFile.name}`;
      const { error: uploadError } = await supabase
        .storage
        .from('server-images')
        .upload(image_path, imageFile);

      if (uploadError) {
        console.error('Ошибка загрузки изображения:', uploadError.message);
        alert('Ошибка загрузки изображения');
        setLoading(false);
        return;
      }

      const { data: publicUrlData } = supabase
        .storage
        .from('server-images')
        .getPublicUrl(image_path);

      image_url = publicUrlData.publicUrl;
    }

    // 3. Сохраняем запись в таблицу servers
    const { error: insertError } = await supabase
      .from('servers')
      .insert([{
        user_id: user.id,
        title: form.title,
        description: form.description,
        wipe_seconds: Number(form.wipe_seconds),
        reset_seconds: Number(form.reset_seconds),
        launch_at: form.launch_at,
        telegram_url: form.telegram_url,
        image_url,
        image_path
      }]);

    if (insertError) {
      console.error('Ошибка добавления сервера:', insertError.message);
      alert('Ошибка публикации сервера');
      setLoading(false);
      return;
    }

    // 4. Переход на страницу мониторинга
    nav('/servers');
  };

  return (
    <div className="add-server-container">
      <h2 className="add-server-title">Опубликовать сервер</h2>
      <form className="add-server-form" onSubmit={handleSubmit}>
        <label>Название проекта</label>
        <input
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          required
        />

        <label>Изображение (JPG)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Превью"
            className="add-server-image-preview"
          />
        )}

        <label>Описание</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <label>Длительность вайпа (сек)</label>
        <input
          name="wipe_seconds"
          type="number"
          value={form.wipe_seconds}
          onChange={handleChange}
        />

        <label>Сброс медали (сек)</label>
        <input
          name="reset_seconds"
          type="number"
          value={form.reset_seconds}
          onChange={handleChange}
        />

        <label>Дата и время запуска</label>
        <input
          name="launch_at"
          type="datetime-local"
          value={form.launch_at}
          onChange={handleChange}
          required
        />

        <label>Telegram адрес проекта</label>
        <input
          name="telegram_url"
          type="url"
          value={form.telegram_url}
          onChange={handleChange}
        />

        <div className="add-server-actions">
          <Button type="submit" disabled={loading}>
            {loading ? 'Публикация...' : 'Опубликовать'}
          </Button>
          <Button type="button" onClick={() => nav(-1)}>Отмена</Button>
        </div>
      </form>
    </div>
  );
}
