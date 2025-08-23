import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import Button from '../components/Button';
import '../styles/auth.css'; // общий стиль для форм входа/регистрации

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr('');

    if (!email.trim() || !password.trim()) {
      setErr('Введите email и пароль');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setErr('Неверный email или пароль');
        } else {
          setErr(error.message);
        }
        return;
      }

      if (data?.user) {
        nav('/profile');
      } else {
        setErr('Не удалось войти. Попробуйте ещё раз.');
      }
    } catch (err) {
      console.error(err);
      setErr('Произошла ошибка при входе');
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleLogin} className="auth-form">
        <h1 className="auth-title">Вход</h1>

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
          Войти
        </Button>

        <div className="auth-link">
          Нет аккаунта?{' '}
          <Link to="/register">Зарегистрироваться</Link>
        </div>
      </form>
    </div>
  );
}
