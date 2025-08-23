import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import Button from '../components/Button';
import '../styles/auth.css'; // общий стиль для всех форм

export default function Gate() {
  const [pwd, setPwd] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    // Если пользователь уже авторизован — сразу на профиль
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) nav('/profile');
    });
  }, [nav]);

  const handle = (e) => {
    e.preventDefault();
    if (pwd === 'dragon123') {
      nav('/login'); // правильный пароль — на вход
    } else {
      setErr('Неверный пароль');
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handle} className="auth-form">
        <h1 className="auth-title">Доступ к проекту</h1>

        <label className="grid gap-2">
          <span>Введите пароль доступа</span>
          <input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            className="auth-input"
          />
        </label>

        {err && <div className="text-red-400 text-sm mt-2">{err}</div>}

        <Button type="submit" className="auth-button" style={{ marginTop: '1.5rem' }}>
          Продолжить
        </Button>
      </form>
    </div>
  );
}
