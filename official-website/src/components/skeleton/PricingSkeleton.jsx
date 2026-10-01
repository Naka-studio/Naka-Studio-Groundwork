export default function PricingSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <div className="pricing-card pricing-skeleton" key={i}>
          <div className="pricing-card-header">
            <span className="skeleton-line pricing-skeleton__name" />
            <div className="pricing-card-amount">
              <span className="skeleton-line pricing-skeleton__from" />
              <span className="skeleton-line pricing-skeleton__price" />
            </div>
          </div>

          <div className="pricing-card-divider" />

          <div className="pricing-card-includes">
            <span className="skeleton-line pricing-skeleton__label" />

            <ul className="pricing-card-list">
              {Array.from({ length: 4 }).map((_, j) => (
                <li key={j}>
                  <span className="skeleton-line pricing-skeleton__check" />
                  <span
                    className={`skeleton-line pricing-skeleton__item${
                      j === 3 ? " short" : ""
                    }`}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
}
