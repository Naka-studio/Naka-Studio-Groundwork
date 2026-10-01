import { Link } from "react-router-dom";
import { FiArrowUpRight, FiArrowRight } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import { copy } from "../../i18n";
import { useProjects } from "../../hooks/api/useProjects";
import { useReveal } from "../../hooks/useReveal";
import ProjectSkeleton from "../../components/skeleton/ProjectSkeleton";
import "../../components/skeleton/Skeleton.scss";
import "./Work.scss";

export default function Work() {
  const ref = useReveal();
  const { lang } = useApp();
  const t = copy[lang];
  const { projects, loading } = useProjects();

  return (
    <section id="work" className="work section">
      <div className="container">
        <div className="section-label">
          <span>{t.workLabel}</span>
          <span className="label-line" />
        </div>

        <div className="section-intro split" ref={ref}>
          <h2>
            {lang === "id" ? (
              <>
                Beberapa hal yang
                <br />
                <em>pernah kami buat.</em>
              </>
            ) : (
              <>
                A few things
                <br />
                <em>we've made.</em>
              </>
            )}
          </h2>

          <p>
            Mock projects below are ready to be replaced by your backend data.
          </p>
        </div>

        <div className="project-grid">
          {loading ? (
            <ProjectSkeleton />
          ) : (
            projects.map((project, i) => (
              <article
                key={project.id}
                className={`project${i === 1 ? " project-offset" : ""}`}
              >
                <a href="#contact" className="project-image-wrap">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <span className="project-arrow">
                    <FiArrowUpRight />
                  </span>
                </a>

                <div className="project-meta">
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>

                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="project-category">{project.category}</div>
              </article>
            ))
          )}
        </div>

        <div className="work-footer">
          <Link to="/work" className="text-link">
            {lang === "id" ? "Lihat semua karya" : "View all work"}
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
