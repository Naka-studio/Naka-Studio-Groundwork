export default function ProjectSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <article
          key={i}
          className={`project project-skeleton${i === 1 ? " project-offset" : ""}`}
        >
          <div className="project-image-wrap skeleton-block" />

          <div className="project-meta">
            <div>
              <div className="skeleton-line skeleton-title" />
              <div className="skeleton-line skeleton-description" />
              <div className="skeleton-line skeleton-description short" />
            </div>

            <div className="project-tags">
              <span className="skeleton-tag" />
              <span className="skeleton-tag" />
              <span className="skeleton-tag short" />
            </div>
          </div>

          <div className="skeleton-line skeleton-category" />
        </article>
      ))}
    </>
  );
}
