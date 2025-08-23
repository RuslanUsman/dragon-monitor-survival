import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-5xl font-bold text-primary mb-4">404</h1>
      <p className="text-lg text-white/80 mb-8">
        Упс... страница не найдена или была удалена.
      </p>
      <Link to="/">
        <Button>Вернуться на главную</Button>
      </Link>
    </div>
  );
}
