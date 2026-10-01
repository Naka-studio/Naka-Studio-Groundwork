export default function BlogSkeleton() {
  return (
    <>
      {Array.from({ length: 2 }).map((_, i) => (
        <article
          key={i}
          className={`blog-featured-card ${
            i === 0 ? "blog-featured-card--large" : ""
          } blog-skeleton`}
        >
          <div className="blog-featured-card__inner">
            <div className="blog-featured-card__meta">
              <span className="skeleton-line blog-skeleton__tag" />
              <span className="skeleton-line blog-skeleton__read-time" />
            </div>

            <div className="skeleton-line blog-skeleton__title" />
            <div className="skeleton-line blog-skeleton__title short" />

            <div className="skeleton-line blog-skeleton__excerpt" />
            <div className="skeleton-line blog-skeleton__excerpt short" />

            <div className="blog-featured-card__footer">
              <span className="skeleton-line blog-skeleton__date" />
              <span className="skeleton-line blog-skeleton__arrow" />
            </div>
          </div>
        </article>
      ))}
    </>
  );
}
