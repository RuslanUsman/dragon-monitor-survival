import Button from '../components/Button';
import '../styles/About.css';

export default function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        {/* Логотип с breathing glow */}
        <img
          src="/images/dragon-logo.png"
          alt="Dragon Monitor Survival"
          className="about-logo"
        />

        {/* Текст */}
        <p className="about-text">
          Dragon Monitor Survival — это площадка для размещения своих серверов
          Last Island of Survival, а также для отслеживания серверов, которая была
          создана для тех, кто решил опубликовать свой сервер на нашей платформе.
          Для регистрации нажмите «Перейти в Telegram» или свяжитесь с разработчиками.
          Для мониторинга регистрироваться не нужно.
        </p>

        {/* Кнопка */}
        <a
          href="https://t.me/Dragon010101"
          target="_blank"
          rel="noreferrer"
        >
          <Button className="about-button">Перейти в Telegram</Button>
        </a>
      </div>
    </div>
  );
}
