import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { copy } from "../../i18n";
import "./Footer.scss";

export default function Footer() {
  const { lang } = useApp();
  const t = copy[lang];

  return (
    <footer className="footer">
      <div className="container footer-top">
        <div>
          <Link className="logo footer-logo" to="/">
            NAKA<span>®</span>
          </Link>
          <p>{t.footerTagline}</p>
        </div>
        <div className="footer-links">
          <Link to="/work">{t.nav[0]}</Link>
          <Link to="/services">{t.nav[1]}</Link>
          <Link to="/about">{t.nav[2]}</Link>
          <Link to="/contact">{t.talk}</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Naka Studio</span>
        <span>Built with intent.</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
