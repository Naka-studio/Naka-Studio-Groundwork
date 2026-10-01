import { Link } from "react-router-dom";
import { FiArrowUpRight, FiMail, FiMessageCircle } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import { copy } from "../../i18n";
import { contactMe } from "../../data/contact";
import "./CTA.scss";

export default function CTA() {
  const { lang } = useApp();
  const t = copy[lang];

  const { wa: waNumber, email } = contactMe[0];
  const wa = `https://wa.me/${waNumber}?text=${encodeURIComponent(t.waMessage)}`;
  const mail = `mailto:${email}?subject=${encodeURIComponent(t.mailSubject)}`;

  return (
    <section id="contact" className="cta-section">
      <div className="container cta-inner">
        <span className="eyebrow">{t.ctaLabel}</span>
        <h2>
          {lang === "id" ? (
            <>
              Punya bisnis?
              <br />
              <em>Bikin website yang terasa seperti kamu.</em>
            </>
          ) : (
            <>
              Have a business?
              <br />
              <em>Let's make it feel like you.</em>
            </>
          )}
        </h2>
        <p>{t.ctaBody}</p>
        <div className="cta-actions">
          <Link className="btn btn-primary large" to="/contact">
            {t.talk} <FiArrowUpRight />
          </Link>
          <a
            className="btn btn-secondary large"
            href={lang === "id" ? mail : wa}
          >
            {lang === "id" ? (
              <>
                <FiMail /> Email
              </>
            ) : (
              <>
                <FiMessageCircle /> WhatsApp
              </>
            )}
          </a>
        </div>
      </div>
    </section>
  );
}
