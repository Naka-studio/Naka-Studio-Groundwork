export default function TestimonialSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className={`testimonial-item testimonial-skeleton delay-${i + 1}`}
        >
          <div className="skeleton-line testimonial-skeleton__quote" />
          <div className="skeleton-line testimonial-skeleton__quote short" />
          <div className="skeleton-line testimonial-skeleton__by" />
        </div>
      ))}
    </>
  );
}
