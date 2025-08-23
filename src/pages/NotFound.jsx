import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="max-w-3xl w-full text-center bg-white/5 backdrop-blur-md rounded-xl p-6 sm:p-10 shadow-lg border border-white/10">
        <h1 className="text-3xl sm:text-5xl font-bold text-primary mb-6">
          Добро пожаловать
        </h1>

        <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-10">
          Приветствуем вас, друзья, на площадке <span className="text-primary font-semibold">Dragon Monitor Survival</span>! 
          Здесь вы можете совершенно бесплатно разместить свои проекты и следить за серверами любимой игры <span className="text-primary">Last Island of Survival</span>.
          <br /><br />
          Будьте первыми, кто узнает о запуске нового сервера и его особенностях.
          Хотите опубликовать свой проект? Нажмите кнопку <span className="italic">«Связаться с разработчиками»</span> — мы вышлем вам пароль для регистрации личного кабинета.
          <br /><br />
          Для мониторинга серверов регистрация не требуется — просто заходите и следите за обновлениями в реальном времени.
          Для входа используйте меню или выберите нужный раздел в верхней части экрана.
          <br /><br />
          <span className="text-white/60">С уважением, создатель проекта — Dragon.</span>
        </p>

        <Link to="/" className="inline-block">
          <Button className="px-6 py-3 text-lg rounded-lg shadow-md hover:scale-105 transition-transform">
            Меню
          </Button>
        </Link>
      </div>
    </div>
  );
}
