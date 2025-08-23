import Button from '../components/Button';
import '../styles/About.css';

export default function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        <img
          src="/about.jpg"
          alt="О проекте"
          className="about-image"
        />
        <p className="about-text">
          Dragan Monitor Survival — площадка для публикации и мониторинга серверов с акцентом на ясный UI и живую динамику интерфейса.
        </p>
        <a
          href="https://t.me/your_telegram_username"
          target="_blank"
          rel="noreferrer"
        >
          <Button className="about-button">Перейти в Telegram</Button>
        </a>
      </div>
    </div>
  );
}
