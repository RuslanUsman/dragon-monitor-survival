import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-5xl font-bold text-primary mb-4">Добро пожаловать</h1>
      <p className="text-lg text-white/80 mb-8">
        Приветствуем вас, друзья, на площадке Dragon Monitor Survival! Здесь вы можете совершенно бесплатно разместить свои проекты и следить за серверами любимой игры Last Island of Survival.

Будьте первыми, кто узнает о запуске нового сервера и его особенностях. Хотите опубликовать свой проект? Нажмите кнопку «Связаться с разработчиками» — мы вышлем вам пароль для регистрации личного кабинета.

Для мониторинга серверов регистрация не требуется — просто заходите и следите за обновлениями в реальном времени.

Для входа на нашу площадку используйте меню или выберите нужный раздел в верхней части экрана.

С уважением, создатель проекта — Dragon.
      </p>
      <Link to="/">
        <Button> Меню </Button>
      </Link>
    </div>
  );
}
