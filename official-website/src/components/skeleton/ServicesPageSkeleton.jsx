export default function ServicesPageSkeleton() {
  return (
    <div className="sp-list">
      {Array.from({ length: 4 }).map((_, i) => (
        <div className="sp-row services-page-skeleton" key={i}>
          <div className="sp-row__trigger">
            <span className="skeleton-line services-skeleton__num" />
            <span className="skeleton-line services-skeleton__title" />
            <span className="skeleton-line services-skeleton__tagline" />
            <span className="skeleton-line services-skeleton__icon" />
          </div>
        </div>
      ))}
    </div>
  );
}
