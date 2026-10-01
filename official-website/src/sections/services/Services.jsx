import { useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiMinus, FiArrowRight } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import { copy } from "../../i18n";
import { useReveal } from "../../hooks/useReveal";
import { useServices } from "../../hooks/api/useServices";
import ServicesPageSkeleton from "../../components/skeleton/ServicesPageSkeleton";
import "./Services.scss";

export default function Services() {
  const ref = useReveal();
  const { lang } = useApp();
  const t = copy[lang];
  const { services, loading } = useServices();
  const [active, setActive] = useState(null);

  const toggle = (i) => setActive(active === i ? null : i);

  const sorted = [...services].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <section id="services" className="services section">
      <div className="container">
        <div className="section-label">
          <span>{t.servicesLabel}</span>
          <span className="label-line" />
        </div>

        <div className="section-intro" ref={ref}>
          <h2>
            {lang === "id" ? (
              <>
                Desain dengan alasan.
                <br />
                Code dengan tujuan.
              </>
            ) : (
              <>
                Design with a reason.
                <br />
                Code with intent.
              </>
            )}
          </h2>
        </div>

        <div className="services-list">
          {loading ? (
            <ServicesPageSkeleton />
          ) : (
            sorted.map((svc, i) => (
              <button
                key={svc.id}
                className={`service-row${active === i ? " active" : ""}`}
                onClick={() => toggle(i)}
              >
                <span className="service-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="service-title">{svc.title}</span>
                <span className="service-desc">
                  {lang === "id" ? svc.description_id : svc.description_en}
                </span>
                <span className="service-icon">
                  {active === i ? <FiMinus /> : <FiPlus />}
                </span>
              </button>
            ))
          )}
        </div>

        <div className="services-footer">
          <Link to="/services" className="text-link">
            {lang === "id" ? "Lihat semua layanan" : "View all services"}
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
