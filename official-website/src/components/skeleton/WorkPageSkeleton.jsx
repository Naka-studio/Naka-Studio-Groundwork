export default function WorkPageSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <article
          key={i}
          className={`wp-project ${i % 3 === 1 ? "wp-project--offset" : ""}`}
        >
          <div className="wp-project__image-wrap skeleton-block" />

          <div className="wp-project__meta">
            <div>
              <span className="skeleton-line work-page-skeleton__category" />
              <div className="skeleton-line work-page-skeleton__title" />
              <div className="skeleton-line work-page-skeleton__description" />
              <div className="skeleton-line work-page-skeleton__description short" />
            </div>

            <div className="wp-project__tags">
              <span className="skeleton-tag" />
              <span className="skeleton-tag" />
              <span className="skeleton-tag short" />
            </div>
          </div>
        </article>
      ))}
    </>
  );
}
