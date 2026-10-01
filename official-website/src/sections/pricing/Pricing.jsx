import { useApp } from "../../context/AppContext";
import { copy } from "../../i18n";
import { useReveal } from "../../hooks/useReveal";
import { usePricing } from "../../hooks/api/usePricing";
import PricingSkeleton from "../../components/skeleton/PricingSkeleton";
import "../../components/skeleton/Skeleton.scss";
import "./Pricing.scss";

export default function Pricing() {
  const ref = useReveal();
  const { lang } = useApp();
  const t = copy[lang];
  const { pricing, loading } = usePricing();

  return (
    <section id="pricing" className="pricing section">
      <div className="container">
        <div className="section-label">
          <span>{t.pricingLabel}</span>
          <span className="label-line" />
        </div>

        <div className="section-intro" ref={ref}>
          <h2>{t.pricingTitle}</h2>
        </div>

        <div className="pricing-grid">
          {loading ? (
            <PricingSkeleton />
          ) : (
            pricing.map((item) => (
              <div className="pricing-card" key={item.id}>
                <div className="pricing-card-header">
                  <span className="pricing-card-name">{item.label[lang]}</span>

                  <div className="pricing-card-amount">
                    <span className="pricing-card-from">
                      {lang === "id" ? "mulai dari" : "from"}
                    </span>
                    <span className="pricing-card-price">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(Number(item.starting_from))}
                    </span>
                  </div>
                </div>

                <div className="pricing-card-divider" />

                <ul className="pricing-card-list">
                  {item.base_scope[lang].map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                {item.note?.[lang] && (
                  <p className="pricing-card-note">{item.note[lang]}</p>
                )}
              </div>
            ))
          )}
        </div>

        <p className="pricing-footer-note">{t.pricingNote}</p>
      </div>
    </section>
  );
}
