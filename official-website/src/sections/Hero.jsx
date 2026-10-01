import { FiArrowUpRight, FiArrowRight } from "react-icons/fi";
import { useApp } from "../context/AppContext";
import { copy } from "../i18n";
import { useReveal } from "../hooks/useReveal";
import { useAvailability } from "../hooks/api/useAvailability";
import { contactMe } from "../data/contact";
import "./Hero.scss";

export default function Hero() {
	const ref = useReveal();

	const { lang } = useApp();
	const t = copy[lang];
	const { globalStatus } = useAvailability();

	const { wa: waNumber, email } = contactMe[0];
	const wa = `https://wa.me/${waNumber}?text=${encodeURIComponent(t.waMessage)}`;
	const mail = `mailto:${email}?subject=${encodeURIComponent(t.mailSubject)}`;
	const ctaHref = lang === "id" ? wa : mail;

	return (
		<section className="hero container">
			<div className="hero-grid">
				<div className="hero-copy" ref={ref}>
					<div className="eyebrow">
						<span className="status-dot" />
						{t.heroEyebrow}
					</div>
					<h1>
						{lang === "id" ? (
							<>
								Website yang terasa
								<br />
								<em>benar-benar manusia.</em>
							</>
						) : (
							<>
								Websites that feel
								<br />
								<em>unmistakably human.</em>
							</>
						)}
					</h1>
					<p>{t.heroBody}</p>
					{globalStatus && (
						<p className="hero-status" data-status={globalStatus.status}>
							<span className="status-dot" />
							{globalStatus.message[lang]}
						</p>
					)}
					<div className="hero-actions">
						<a className="btn btn-primary" href={ctaHref}>
							{t.talk} <FiArrowUpRight />
						</a>
						<a className="text-link" href="#work">
							{t.work} <FiArrowRight />
						</a>
					</div>
				</div>

				<div className="hero-art" ref={ref} aria-hidden="true">
					<div className="orb">
						<div className="orb-ring ring-one" />
						<div className="orb-ring ring-two" />
						<div className="orb-core" />
					</div>
					<span className="coord coord-a">03° 12' 04"</span>
					<span className="coord coord-b">NAKA / 001</span>
					<span className="coord coord-c">HUMAN—01</span>
					<span className="orbit-line" />
				</div>
			</div>

			<div className="scroll-note">
				<span />
				{t.scroll}
			</div>
		</section>
	);
}
