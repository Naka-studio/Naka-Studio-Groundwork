import { Link } from "react-router-dom";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import { copy } from "../../i18n";
import { contactMe } from "../../data/contact";
import "./AboutPage.scss";

export default function AboutPage() {
  const { lang } = useApp();
  const t = copy[lang];

  const { wa: waNumber, email } = contactMe[0];
  const wa = `https://wa.me/${waNumber}?text=${encodeURIComponent(t.waMessage)}`;
  const mail = `mailto:${email}?subject=${encodeURIComponent(t.mailSubject)}`;
  const ctaHref = lang === "id" ? wa : mail;

  return (
    <main className="about-page">
      {/* Header */}
      <section className="about-page__header container">
        <Link to="/" className="about-page__back">
          <FiArrowLeft /> {t.aboutBack}
        </Link>
        <div className="about-page__hero">
          <span className="eyebrow">
            <span className="status-dot" /> {t.aboutEyebrow}
          </span>
          <h1 className="about-page__title">
            {t.aboutTitle.split("\n").map((line, i) => (
              <span key={i}>{i === 1 ? <em>{line}</em> : line}</span>
            ))}
          </h1>
          <p className="about-page__sub">{t.aboutSub}</p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="about-page__section container">
        <div className="about-two-col">
          <div className="section-label">
            <span>{t.aboutPhilosophyTitle}</span>
            <span className="label-line" />
          </div>
          <div className="about-philosophy">
            {t.aboutPhilosophy.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            <div className="hand-note">taste matters.</div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="about-page__section about-page__section--alt container">
        <div className="section-label">
          <span>{t.aboutApproachTitle}</span>
          <span className="label-line" />
        </div>
        <div className="about-approach">
          {t.aboutApproach.map((item) => (
            <div key={item.num} className="about-approach__item">
              <span className="about-approach__num">{item.num}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Studio */}
      <section className="about-page__section container">
        <div className="about-two-col">
          <div className="section-label">
            <span>{t.aboutStudioTitle}</span>
            <span className="label-line" />
          </div>
          <div className="about-studio">
            <p>{t.aboutStudioBody}</p>
            <p className="about-studio__note">{t.aboutStudioNote}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-page__cta container">
        <div className="about-page__cta-inner">
          <div>
            <h2>{t.aboutCta}</h2>
            <p>{t.aboutCtaBody}</p>
          </div>
          <a href={ctaHref} className="btn btn-primary">
            {t.talk} <FiArrowUpRight />
          </a>
        </div>
      </section>
    </main>
  );
}
