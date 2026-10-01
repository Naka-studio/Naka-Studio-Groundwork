import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
	FiArrowUpRight,
	FiMenu,
	FiX,
	FiSun,
	FiMoon,
	FiGlobe,
} from "react-icons/fi";
import { useApp } from "../context/AppContext.jsx";
import { copy } from "../i18n";
import { contactMe } from "../data/contact";
import "./Navbar.scss";

export default function Navbar() {
	const { lang, theme, toggleTheme, toggleLang } = useApp();
	const t = copy[lang];
	const [menu, setMenu] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	const { wa: waNumber, email } = contactMe[0];
	const wa = `https://wa.me/${waNumber}?text=${encodeURIComponent(t.waMessage)}`;
	const mail = `mailto:${email}?subject=${encodeURIComponent(t.mailSubject)}`;
	const ctaHref = lang === "id" ? wa : mail;

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const closeMenu = () => setMenu(false);

	const navLinks = [
		["#work", t.nav[0]],
		["#services", t.nav[1]],
		["#about", t.nav[2]],
		["/blog", t.nav[3]],
	];

	return (
		<header className={`nav-wrap${scrolled ? " is-scrolled" : ""}`}>
			<nav className="nav container">
				<Link
					className="logo"
					to="/"
					onClick={closeMenu}
					aria-label="Naka Studio Home"
				>
					NAKA<span>®</span>
				</Link>

				<div className={`nav-links${menu ? " open" : ""}`}>
					{navLinks.map(([href, label]) =>
						href.startsWith("/") ? (
							<Link key={href} to={href} onClick={closeMenu}>
								{label}
							</Link>
						) : (
							<a key={href} href={href} onClick={closeMenu}>
								{label}
							</a>
						),
					)}
					<a className="nav-cta mobile-cta" href={ctaHref} onClick={closeMenu}>
						{t.talk} <FiArrowUpRight />
					</a>
				</div>

				<div className="nav-actions">
					<button
						className="icon-btn"
						onClick={toggleLang}
						aria-label="Switch Language"
					>
						<FiGlobe />
						<span>{lang.toUpperCase()}</span>
					</button>
					<button
						className="icon-btn"
						onClick={toggleTheme}
						aria-label="Switch Theme"
					>
						{theme === "dark" ? <FiSun /> : <FiMoon />}
					</button>
					<a className="nav-cta desktop-cta" href={ctaHref}>
						{t.talk} <FiArrowUpRight />
					</a>
					<button
						className="menu-btn"
						onClick={() => setMenu(!menu)}
						aria-label="Toggle Menu"
					>
						{menu ? <FiX /> : <FiMenu />}
					</button>
				</div>
			</nav>
		</header>
	);
}
