import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiArrowUpRight, FiPlus, FiMinus } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import { copy } from "../../i18n";
import { useServices } from "../../hooks/api/useServices";
import { useAvailability } from "../../hooks/api/useAvailability";
import { contactMe } from "../../data/contact";
import ServicesPageSkeleton from "../../components/skeleton/ServicesPageSkeleton";
import "../../components/skeleton/Skeleton.scss";
import "./ServicesPage.scss";

export default function ServicesPage() {
	const { lang } = useApp();
	const t = copy[lang];
	const { services: rawServices, loading } = useServices();

	const services = rawServices.map((s) => ({
		...s,
		description: lang === "id" ? s.description_id : s.description_en,
	}));

	const { byService } = useAvailability();

	const [active, setActive] = useState(null);

	const toggle = (i) => setActive(active === i ? null : i);

	const { wa: waNumber, email } = contactMe[0];
	const wa = `https://wa.me/${waNumber}?text=${encodeURIComponent(t.waMessage)}`;
	const mail = `mailto:${email}?subject=${encodeURIComponent(t.mailSubject)}`;
	const ctaHref = lang === "id" ? wa : mail;

	return (
		<main className="services-page">
			<section className="services-page__header container">
				<Link to="/" className="services-page__back">
					<FiArrowLeft /> {t.servicesBack}
				</Link>

				<div className="services-page__hero">
					<span className="eyebrow">
						<span className="status-dot" /> {t.servicesEyebrow}
					</span>

					<h1 className="services-page__title">
						{t.servicesTitle.split("\n").map((line, i) => (
							<span key={i}>{line}</span>
						))}
					</h1>

					<p className="services-page__sub">{t.servicesSub}</p>
				</div>
			</section>

			<section className="services-page__list container">
				{loading ? (
					<ServicesPageSkeleton />
				) : (
					<div className="sp-list">
						{services.map((service, i) => (
							<div
								key={service.id}
								className={`sp-row${active === i ? " active" : ""}`}
							>
								<button
									className="sp-row__trigger"
									onClick={() => toggle(i)}
									aria-expanded={active === i}
								>
									<span className="sp-row__num">{service.id}</span>
									<span className="sp-row__title">{service.title}</span>
									<span className="sp-row__tagline">{service.tagline}</span>
									<span className="sp-row__icon">
										{active === i ? <FiMinus /> : <FiPlus />}
									</span>
								</button>

								<div className="sp-row__body">
									<p>{service.description}</p>

									<div className="sp-row__tags">
										{service.tags.map((tag) => (
											<span key={tag}>{tag}</span>
										))}
									</div>

									{byService[service.id]?.status === "unavailable" ? (
										<span className="sp-row__cta sp-row__cta--off">
											{byService[service.id].message[lang]}
										</span>
									) : (
										<a href={ctaHref} className="sp-row__cta">
											{t.servicesDiscuss} <FiArrowUpRight />
										</a>
									)}
								</div>
							</div>
						))}
					</div>
				)}

				<p className="services-page__note">{t.servicesNotAvailable}</p>
			</section>

			<section className="services-page__cta container">
				<div className="services-page__cta-inner">
					<div>
						<h2>{t.servicesCta}</h2>
						<p>{t.servicesCtaBody}</p>
					</div>

					<a href={ctaHref} className="btn btn-primary large">
						{t.talk} <FiArrowUpRight />
					</a>
				</div>
			</section>
		</main>
	);
}
