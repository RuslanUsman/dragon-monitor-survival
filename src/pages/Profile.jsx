import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import Button from '../components/Button';
import '../styles/Profile.css';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [servers, setServers] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        nav('/login');
        return;
      }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setProfile(profileData);

      const { data: serversData } = await supabase
        .from('servers')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      setServers(serversData || []);
    };

    loadData();
  }, [nav]);

  const deleteServer = async (id) => {
    const { data: server } = await supabase
      .from('servers')
      .select('image_path')
      .eq('id', id)
      .single();

    if (server?.image_path) {
      await supabase.storage.from('server-images').remove([server.image_path]);
    }

    await supabase.from('servers').delete().eq('id', id);
    setServers(servers.filter(s => s.id !== id));
  };

  const deleteProfile = async () => {
    if (!window.confirm('Удалить профиль, все сервера и учётную запись?')) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // 1. Удаляем все сервера и их картинки
    const { data: userServers } = await supabase
      .from('servers')
      .select('id, image_path')
      .eq('user_id', user.id);

    const pathsToRemove = userServers?.filter(s => s.image_path).map(s => s.image_path);
    if (pathsToRemove?.length) {
      await supabase.storage.from('server-images').remove(pathsToRemove);
    }
    await supabase.from('servers').delete().eq('user_id', user.id);

    // 2. Удаляем профиль
    await supabase.from('profiles').delete().eq('id', user.id);

    // 3. Удаляем пользователя из Auth через Edge Function
    const { error: fnError } = await supabase.functions.invoke('delete-user', {
      body: { user_id: user.id },
    });
    if (fnError) {
      console.error('Ошибка удаления учётной записи:', fnError.message);
    }

    // 4. Разлогиниваем и уводим на /login
    await supabase.auth.signOut();
    nav('/login');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-surface rounded-xl border border-white/10">
      {profile && (
        <div className="profile-user-block">
          <h2 className="profile-user-name">{profile.name}</h2>
          <p className="profile-user-email">{profile.email}</p>
          <Button onClick={deleteProfile} className="mt-4 bg-red-600 hover:bg-red-700">
            Удалить профиль
          </Button>
        </div>
      )}

      <div className="profile-header-block">
        <h3 className="profile-title">Мои серверы</h3>
        <Link to="/servers/add">
          <Button>Добавить сервер</Button>
        </Link>
      </div>

      {servers.length === 0 && <p className="text-white/60">Серверов пока нет</p>}

      {servers.map(s => (
        <div key={s.id} className="profile-server-card">
          <div className="profile-server-info">
            <div className="profile-server-title">{s.title}</div>
            <div className="profile-server-date">
              Запуск: {new Date(s.launch_at).toLocaleString()}
            </div>
            <div className="profile-server-actions">
              <Link to={`/servers/${s.id}/edit`}>
                <Button>Редактировать</Button>
              </Link>
              <Button onClick={() => deleteServer(s.id)}>Удалить</Button>
            </div>
          </div>
          {s.image_url && (
            <img
              src={s.image_url}
              alt={s.title}
              className="profile-server-image"
            />
          )}
        </div>
      ))}
    </div>
  );
}
