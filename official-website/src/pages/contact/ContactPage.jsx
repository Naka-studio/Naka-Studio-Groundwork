import { useState } from "react";
import { Link } from "react-router-dom";
import {
	FiArrowLeft,
	FiArrowUpRight,
	FiMessageCircle,
	FiSend,
	FiInstagram,
	FiYoutube,
	FiLinkedin,
	FiGithub,
	FiGlobe,
} from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import { copy } from "../../i18n";
import { contactMe } from "../../data/contact";
import "./ContactPage.scss";

export default function ContactPage() {
	const { lang } = useApp();
	const t = copy[lang];

	const [form, setForm] = useState({ name: "", email: "", message: "" });
	const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'

	const {
		wa: waNumber,
		email,
		instagram,
		youtube,
		linkedin,
		github,
		profileweb,
	} = contactMe[0];

	const wa = `https://wa.me/${waNumber}?text=${encodeURIComponent(t.waMessage)}`;

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus("loading");
		try {
			const res = await fetch(
				`${import.meta.env.VITE_API_URL}/contact/submit`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(form),
				},
			);
			const data = await res.json();
			if (data.success) {
				setStatus("success");
				setForm({ name: "", email: "", message: "" });
			} else {
				setStatus("error");
			}
		} catch (err) {
			setStatus("error");
		}
	};

	const socials = [
		{ href: instagram, icon: <FiInstagram />, label: "Instagram" },
		{ href: youtube, icon: <FiYoutube />, label: "YouTube" },
		{ href: linkedin, icon: <FiLinkedin />, label: "LinkedIn" },
		{ href: github, icon: <FiGithub />, label: "GitHub" },
		{ href: profileweb, icon: <FiGlobe />, label: "Bayanaka" },
	];

	return (
		<main className="contact-page">
			{/* Header */}
			<section className="contact-page__header container">
				<Link to="/" className="contact-page__back">
					<FiArrowLeft /> {t.contactBack}
				</Link>
				<div className="contact-page__hero">
					<span className="eyebrow">
						<span className="status-dot" /> {t.contactEyebrow}
					</span>
					<h1 className="contact-page__title">
						{t.contactTitle.split("\n").map((line, i) => (
							<span key={i}>{line}</span>
						))}
					</h1>
					<p className="contact-page__sub">{t.contactSub}</p>
				</div>
			</section>

			{/* Body */}
			<section className="contact-page__body container">
				<div className="contact-grid">
					{/* Left — WA + Social */}
					<div className="contact-left">
						<a
							href={wa}
							className="contact-card contact-card--primary"
							target="_blank"
							rel="noopener noreferrer"
						>
							<div className="contact-card__icon">
								<FiMessageCircle />
							</div>
							<div>
								<h3>{t.contactWa}</h3>
								<p>{t.contactWaNote}</p>
							</div>
							<FiArrowUpRight className="contact-card__arrow" />
						</a>

						{/* Social links */}
						<div className="contact-social">
							<div className="section-label">
								<span>{lang === "id" ? "Di tempat lain" : "Elsewhere"}</span>
								<span className="label-line" />
							</div>
							<div className="contact-social__links">
								{socials.map(({ href, icon, label }) => (
									<a
										key={label}
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										className="contact-social__item"
									>
										{icon}
										<span>{label}</span>
										<FiArrowUpRight className="contact-social__arrow" />
									</a>
								))}
							</div>
						</div>
					</div>

					{/* Divider */}
					<div className="contact-divider">
						<span />
					</div>

					{/* Right — Email form */}
					<div className="contact-form-wrap">
						<div className="contact-form-header">
							<h2>{t.contactFormTitle}</h2>
							<p>{t.contactFormNote}</p>
						</div>
						<form className="contact-form" onSubmit={handleSubmit}>
							<div className="contact-form__field">
								<label htmlFor="name">{t.contactName}</label>
								<input
									id="name"
									name="name"
									type="text"
									placeholder={t.contactPlaceholderName}
									value={form.name}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="contact-form__field">
								<label htmlFor="email">{t.contactEmail}</label>
								<input
									id="email"
									name="email"
									type="email"
									placeholder={t.contactPlaceholderEmail}
									value={form.email}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="contact-form__field">
								<label htmlFor="message">{t.contactMessage}</label>
								<textarea
									id="message"
									name="message"
									placeholder={t.contactPlaceholderMessage}
									value={form.message}
									onChange={handleChange}
									rows={6}
									required
								/>
							</div>
							<button
								type="submit"
								className="btn btn-primary"
								disabled={status === "loading"}
							>
								{status === "loading" ? (
									"Sending..."
								) : (
									<>
										{t.contactSend} <FiSend />
									</>
								)}
							</button>

							{status === "success" && (
								<p className="form-success">
									✅ {lang === "id" ? "Pesan terkirim!" : "Message sent!"}
								</p>
							)}
							{status === "error" && (
								<p className="form-error">
									❌{" "}
									{lang === "id"
										? "Gagal kirim, coba lagi."
										: "Failed to send, try again."}
								</p>
							)}
						</form>
					</div>
				</div>
			</section>
		</main>
	);
}
