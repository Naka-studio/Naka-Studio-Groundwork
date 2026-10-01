import { useApp } from "../../context/AppContext";
import { copy } from "../../i18n";
import { useReveal } from "../../hooks/useReveal";
import "./Process.scss";

export default function Process() {
	const ref = useReveal();

	const { lang } = useApp();
	const t = copy[lang];

	return (
		<section className="process section">
			<div className="container two-col">
				<div className="section-label">
					<span>{t.processLabel}</span>
					<span className="label-line" />
				</div>
				<div>
					<h2 className="process-heading" ref={ref}>{t.processTitle}</h2>
					<div className="process-list">
						{t.process.map(([title, desc], i) => (
							<div className="process-item" key={title}>
								<span>0{i + 1}</span>
								<div>
									<h3>{title}</h3>
									<p>{desc}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
