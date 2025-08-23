import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import Button from '../components/Button';
import '../styles/auth.css'; // Подключаем общий стиль для форм

export default function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr('');

    if (!email.trim() || !password.trim() || !name.trim()) {
      setErr('Заполните все поля');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        setErr(error.message);
        return;
      }

      if (data?.user) {
        await supabase.from('profiles').insert({
          id: data.user.id,
          email: data.user.email,
          name: name.trim(),
        });
        nav('/profile');
      } else {
        setErr('Не удалось зарегистрироваться. Попробуйте ещё раз.');
      }
    } catch (err) {
      console.error(err);
      setErr('Произошла ошибка при регистрации');
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleRegister} className="auth-form">
        <h1 className="auth-title">Регистрация</h1>

        <label className="grid gap-2">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            className="auth-input"
          />
        </label>

        <label className="grid gap-2" style={{ marginTop: '1rem' }}>
          <span>Имя</span>
          <input
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
            className="auth-input"
          />
        </label>

        <label className="grid gap-2" style={{ marginTop: '1rem' }}>
          <span>Пароль</span>
          <input
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            className="auth-input"
          />
        </label>

        {err && <div className="text-red-400 text-sm mt-2">{err}</div>}

        <Button type="submit" className="auth-button" style={{ marginTop: '1.5rem' }}>
          Зарегистрироваться
        </Button>

        <div className="auth-link">
          Уже есть аккаунт?{' '}
          <Link to="/login">Войти</Link>
        </div>
      </form>
    </div>
  );
}

