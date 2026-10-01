import { useApp } from "../../context/AppContext";
import { copy } from "../../i18n";
import { useReveal } from "../../hooks/useReveal";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import "./Manifesto.scss";

export default function Manifesto() {
  const ref = useReveal();
  const { lang } = useApp();
  const t = copy[lang];

  return (
    <section id="about" className="manifesto section">
      <div className="container two-col">
        <div className="section-label">
          <span>{t.manifestoLabel}</span>
          <span className="label-line" />
        </div>
        <div className="manifesto-content" ref={ref}>
          <h2>
            {lang === "id" ? (
              <>
                AI bisa menghasilkan.
                <br />
                <em>Manusia memberi makna.</em>
              </>
            ) : (
              <>
                AI can generate.
                <br />
                <em>Humans give it meaning.</em>
              </>
            )}
          </h2>
          <p>{t.manifestoBody}</p>
          <div className="hand-note">taste matters.</div>

          <div className="manifesto-footer">
            <Link to="/about" className="text-link">
              {lang === "id" ? "Kenalan lebih jauh" : "Learn more about us"}
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
