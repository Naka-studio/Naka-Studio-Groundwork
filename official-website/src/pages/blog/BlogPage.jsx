import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import { copy } from "../../i18n";
import { useBlog } from "../../hooks/api/useBlog";
import BlogSkeleton from "../../components/skeleton/BlogSkeleton";
import "../../components/skeleton/Skeleton.scss";
import "./BlogPage.scss";

function formatDate(dateStr, lang) {
  return new Date(dateStr).toLocaleDateString(
    lang === "id" ? "id-ID" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );
}

export default function BlogPage() {
  const { lang } = useApp();
  const t = copy[lang];
  const { posts, loading } = useBlog();

  const [activeFilter, setActiveFilter] = useState(t.blogAll);

  useEffect(() => {
    setActiveFilter(t.blogAll);
  }, [lang]);

  const categories = [t.blogAll, ...new Set(posts.map((p) => p.category))];

  const filtered =
    activeFilter === t.blogAll
      ? posts
      : posts.filter((p) => p.category === activeFilter);

  const featured = posts.filter((p) => p.featured);

  return (
    <main className="blog-page">
      <section className="blog-page__header container">
        <Link to="/" className="blog-page__back">
          <FiArrowLeft /> {t.blogBack}
        </Link>

        <div className="blog-page__hero">
          <span className="eyebrow">
            <span className="status-dot" /> {t.blogEyebrow}
          </span>

          <h1 className="blog-page__title">
            {t.blogTitle.split("\n").map((line, i) => (
              <span key={i}>{i === 1 ? <em>{line}</em> : line}</span>
            ))}
          </h1>

          <p className="blog-page__sub">{t.blogSub}</p>
        </div>
      </section>

      <section className="blog-page__featured container">
        <div className="section-label">
          <span>{t.blogFeatured}</span>
          <span className="label-line" />
        </div>

        <div className="blog-featured-grid">
          {loading ? (
            <BlogSkeleton />
          ) : (
            featured.map((post, i) => (
              <article
                key={post.id}
                className={`blog-featured-card ${
                  i === 0 ? "blog-featured-card--large" : ""
                }`}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="blog-featured-card__inner"
                >
                  <div className="blog-featured-card__meta">
                    <span className="blog-tag">{post.category}</span>
                    <span className="blog-read-time">
                      {post.readTime} {t.blogReadTime}
                    </span>
                  </div>

                  <h2>{post.title[lang]}</h2>
                  <p>{post.excerpt[lang]}</p>

                  <div className="blog-featured-card__footer">
                    <span>{formatDate(post.date, lang)}</span>
                    <FiArrowUpRight />
                  </div>
                </Link>
              </article>
            ))
          )}
        </div>
      </section>

      <div className="blog-page__filters container">
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

      <section className="blog-page__list container">
        {loading
          ? null
          : filtered.map((post) => (
              <article key={post.id} className="blog-list-item">
                <Link
                  to={`/blog/${post.slug}`}
                  className="blog-list-item__inner"
                >
                  <div className="blog-list-item__left">
                    <span className="blog-tag">{post.category}</span>
                    <h3>{post.title[lang]}</h3>
                    <p>{post.excerpt[lang]}</p>
                  </div>

                  <div className="blog-list-item__right">
                    <span className="blog-read-time">
                      {post.read_time} {t.blogReadTime}
                    </span>

                    <span className="blog-date">
                      {formatDate(post.date, lang)}
                    </span>

                    <FiArrowUpRight className="blog-list-item__arrow" />
                  </div>
                </Link>
              </article>
            ))}
      </section>
    </main>
  );
}
