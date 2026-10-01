import { useApp } from "../../context/AppContext";
import { copy } from "../../i18n";
import { useTestimonials } from "../../hooks/api/useTestimonials";
import { useReveal } from "../../hooks/useReveal";
import TestimonialSkeleton from "../../components/skeleton/TestimonialSkeleton";
import "../../components/skeleton/Skeleton.scss";
import "./Testimonial.scss";

export default function Testimonial() {
  const { lang } = useApp();
  const t = copy[lang];
  const ref = useReveal();
  const { testimonials, loading } = useTestimonials();

  return (
    <section className="testimonial section" ref={ref}>
      <div className="container">
        <div className="section-label">
          <span>{t.testimonialLabel}</span>
          <span className="label-line" />
        </div>

        <div className="testimonial-list">
          {loading ? (
            <TestimonialSkeleton />
          ) : (
            testimonials.map((item, i) => (
              <div key={item.id} className={`testimonial-item delay-${i + 1}`}>
                <blockquote className="quote">"{item.quote}"</blockquote>
                <p className="quote-by">
                  {item.role}, {item.company}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
