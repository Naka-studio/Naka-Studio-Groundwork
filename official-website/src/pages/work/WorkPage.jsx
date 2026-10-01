import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiArrowLeft } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import { copy } from "../../i18n";
import { useProjects } from "../../hooks/api/useProjects";
import WorkPageSkeleton from "../../components/skeleton/WorkPageSkeleton";
import "../../components/skeleton/Skeleton.scss";
import "./WorkPage.scss";

const WorkPage = () => {
	const { lang } = useApp();
	const t = copy[lang];
	const { projects, loading } = useProjects();

	const [activeFilter, setActiveFilter] = useState(t.workAll);

	useEffect(() => {
		setActiveFilter(t.workAll);
	}, [lang]);

	const categories = [t.workAll, ...new Set(projects.map((p) => p.category))];

	const filtered =
		activeFilter === t.workAll
			? projects
			: projects.filter((p) => p.category === activeFilter);

	return (
		<main className="work-page">
			<section className="work-page__header container">
				<Link to="/" className="work-page__back">
					<FiArrowLeft /> {t.workBack}
				</Link>

				<div className="work-page__hero">
					<span className="eyebrow">
						<span className="status-dot" /> {t.workEyebrow}
					</span>

					<h1 className="work-page__title">
						{t.workTitle.split("\n").map((line, i) =>
							i === 1 ? (
								<span key={i}>
									<em>{line}</em>
								</span>
							) : (
								<span key={i}>{line}</span>
							),
						)}
					</h1>

					<p className="work-page__sub">{t.workSub}</p>
				</div>
			</section>

			{categories.length > 2 && (
				<div className="work-page__filters container">
					{categories.map((cat) => (
						<button
							key={cat}
							className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
							onClick={() => setActiveFilter(cat)}
						>
							{cat}
						</button>
					))}
				</div>
			)}

			<section className="work-page__grid container">
				{loading ? (
					<WorkPageSkeleton />
				) : (
					filtered.map((project, i) => (
						<article
							className={`wp-project ${
								i % 3 === 1 ? "wp-project--offset" : ""
							}`}
							key={project.id}
						>
							<a
								href={project.live_url}
								target="_blank"
								rel="noopener noreferrer"
								className="wp-project__image-wrap"
							>
								<img src={project.image} alt={project.title} loading="lazy" />
								<span className="wp-project__arrow">
									<FiArrowUpRight />
								</span>
							</a>

							<div className="wp-project__meta">
								<div>
									<span className="wp-project__category">
										{project.category}
									</span>
									<h2>{project.title}</h2>
									<p>{project.description}</p>
								</div>

								<div className="wp-project__tags">
									{project.tags.map((tag) => (
										<span key={tag}>{tag}</span>
									))}
								</div>
							</div>
						</article>
					))
				)}
			</section>

			<section className="work-page__cta container">
				<p className="work-page__cta-label">{t.workCtaLabel}</p>

				<Link to="/contact" className="btn btn-primary">
					{t.talk} <FiArrowUpRight />
				</Link>
			</section>
		</main>
	);
};

export default WorkPage;
