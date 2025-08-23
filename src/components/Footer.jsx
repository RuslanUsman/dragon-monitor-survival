import '../styles/Footer.css'; // правильный путь из components → styles
import Button from './Button';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-text">
          © {new Date().getFullYear()} Dragan Monitor Survival
        </div>
        <a
          href="https://t.me/Dragon010101"
          target="_blank"
          rel="noreferrer"
          className="footer-link"
        >
          <Button>Связаться с разработчиками</Button>
        </a>
      </div>
    </footer>
  );
}
