import React, { useState, useEffect } from "react";
import signup from "./signup"
import { Link } from "react-router-dom";


 const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((open) => !open);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  return (
    <>
      <style>{`
        /* Scoped styles for Landing page */
        :root {
          --color-setu-blue: #0A4DAA;
          --color-cloud-grey: #F2F4F7;
          --color-pure-white: #FFFFFF;
          --color-marigold-glow: #FFAF00;
          --color-coastal-teal: #009688;
          --color-success-green: #28A745;
          --color-alert-red: #D32F2F;
          --color-deep-slate: #333333;
          --color-medium-slate: #667085;
          --color-light-grey: #E0E0E0;
          --color-dark-overlay: rgba(0, 0, 0, 0.6);
        }
        .app-container {
          font-family: 'Inter', sans-serif;
          color: var(--color-deep-slate);
          background-color: var(--color-cloud-grey);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          margin: 0;
          overflow-x: hidden;
        }
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Poppins', sans-serif;
          margin: 0;
        }
        .container {
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }
        .header {
          background-color: var(--color-pure-white);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          padding: 1.25rem 0;
          display: flex;
          justify-content: center;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
          transition: all 0.3s ease-in-out;
        }
        .header-inner-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 1200px;
          padding: 0 1.5rem;
        }
        .header-logo-group {
          display: flex;
          align-items: center;
        }
        .setu-logo-icon {
          width: 38px;
          height: 38px;
          stroke-width: 2.5px;
          fill: none;
          color: var(--color-setu-blue);
          margin-right: 0.85rem;
        }
        .header-logo-text {
          font-size: 2rem;
          font-weight: 800;
          color: var(--color-setu-blue);
          letter-spacing: -0.025em;
        }
        .nav-links {
          display: none;
          gap: 3.5rem;
          color: var(--color-medium-slate);
          font-weight: 500;
          font-size: 1.05rem;
        }
        @media (min-width: 768px) {
          .nav-links {
            display: flex;
          }
        }
        .nav-link {
          text-decoration: none;
          position: relative;
          transition: color 0.3s ease-in-out;
          padding: 0.25rem 0;
          cursor: pointer;
          color: var(--color-medium-slate);
        }
        .nav-link:hover {
          color: var(--color-setu-blue);
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0%;
          height: 3px;
          background-color: var(--color-marigold-glow);
          border-radius: 2px;
          transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .mobile-menu-button {
          color: var(--color-setu-blue);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.75rem 0;
          transition: transform 0.3s ease-in-out;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mobile-menu-button:hover {
          transform: scale(1.1);
        }
        @media (min-width: 768px) {
          .mobile-menu-button {
            display: none;
          }
        }
        .icon-24 {
          width: 30px;
          height: 30px;
          stroke-width: 2.5px;
          fill: none;
          stroke: currentColor;
        }
        .mobile-menu-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: var(--color-dark-overlay);
          z-index: 100;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease-out, visibility 0.3s ease-out;
        }
        .mobile-menu-backdrop.open {
          opacity: 1;
          visibility: visible;
        }
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          right: 0;
          width: 80%;
          max-width: 320px;
          height: 100%;
          background-color: var(--color-pure-white);
          box-shadow: -8px 0 20px rgba(0,0,0,0.2);
          z-index: 101;
          display: flex;
          flex-direction: column;
          padding-top: 2rem;
          padding-bottom: 2rem;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .mobile-menu-overlay.open {
          transform: translateX(0);
        }
        .mobile-menu-close-button {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-deep-slate);
          padding: 0.5rem;
          transition: transform 0.2s ease-in-out;
        }
        .mobile-menu-close-button:hover {
          transform: rotate(90deg);
        }
        .mobile-menu-close-button .icon-24 {
          width: 28px;
          height: 28px;
        }
        .mobile-menu-overlay .nav-link {
          padding: 1rem 2rem;
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--color-deep-slate);
          border-bottom: 1px solid var(--color-cloud-grey);
          text-decoration: none;
        }
        .mobile-menu-overlay .nav-link:last-child {
          border-bottom: none;
        }
        .mobile-menu-overlay .nav-link:hover {
          background-color: var(--color-cloud-grey);
          color: var(--color-setu-blue);
        }
        .mobile-menu-overlay .nav-link::after {
          display: none;
        }
        .hero-section {
          background: linear-gradient(to bottom right, var(--color-setu-blue), #1e40af);
          color: var(--color-pure-white);
          padding-top: 5rem;
          padding-bottom: 5rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .hero-section {
            padding-top: 8rem;
            padding-bottom: 8rem;
          }
        }
        .hero-content {
          position: relative;
          z-index: 10;
        }
        .hero-title {
          font-size: 2.25rem;
          line-height: 1.25;
          margin-bottom: 1.5rem;
          font-weight: 800;
        }
        @media (min-width: 768px) {
          .hero-title {
            font-size: 3.75rem;
          }
        }
        .hero-title span {
          color: var(--color-marigold-glow);
        }
        .hero-description {
          font-size: 1.125rem;
          margin-bottom: 2.5rem;
          max-width: 48rem;
          margin-left: auto;
          margin-right: auto;
          opacity: 0.9;
        }
        @media (min-width: 768px) {
          .hero-description {
            font-size: 1.25rem;
          }
        }
        .hero-buttons {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1rem;
        }
        @media (min-width: 640px) {
          .hero-buttons {
            flex-direction: row;
          }
        }
        .btn-primary {
          background-color: var(--color-marigold-glow);
          color: var(--color-pure-white);
          font-weight: 600;
          padding: 0.75rem 2rem;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease-in-out;
          display: inline-block;
          text-decoration: none;
          cursor: pointer;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0px 8px 20px rgba(255, 175, 0, 0.3);
        }
        .btn-secondary {
          border: 2px solid var(--color-pure-white);
          color: var(--color-pure-white);
          font-weight: 600;
          padding: 0.75rem 2rem;
          border-radius: 0.5rem;
          transition: all 0.3s ease-in-out;
          display: inline-block;
          text-decoration: none;
          cursor: pointer;
        }
        .btn-secondary:hover {
          background-color: var(--color-pure-white);
          color: var(--color-setu-blue);
          transform: translateY(-2px);
          box-shadow: 0px 4px 10px rgba(10, 77, 170, 0.2);
        }
        .hero-bg-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.1;
        }
        /* Features Section Styles */
        .features-section {
          padding-top: 4rem;
          padding-bottom: 4rem;
          background-color: var(--color-cloud-grey);
        }
        @media (min-width: 768px) {
          .features-section {
            padding-top: 6rem;
            padding-bottom: 6rem;
          }
        }
        .section-title {
          font-size: 1.875rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 3rem;
          color: var(--color-deep-slate);
        }
        @media (min-width: 768px) {
          .section-title {
            font-size: 2.25rem;
          }
        }
        .section-title span {
          color: var(--color-marigold-glow);
        }
        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 768px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .feature-card {
          background-color: var(--color-pure-white);
          border-radius: 0.75rem;
          padding: 1.5rem;
          box-shadow: 0px 4px 12px rgba(0,0,0,0.05);
          transition: all 0.3s ease-in-out;
        }
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0px 8px 20px rgba(0,0,0,0.1);
        }
        .feature-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 4rem;
          height: 4rem;
          border-radius: 9999px;
          color: var(--color-pure-white);
          margin-bottom: 1rem;
        }
        .feature-icon-wrapper.bg-setu-blue { background-color: var(--color-setu-blue); }
        .feature-icon-wrapper.bg-marigold-glow { background-color: var(--color-marigold-glow); }
        .feature-icon-wrapper.bg-coastal-teal { background-color: var(--color-coastal-teal); }
        .feature-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--color-deep-slate);
        }
        .feature-description {
          color: var(--color-medium-slate);
        }
        /* How It Works Section Styles */
        .how-it-works-section {
          padding-top: 4rem;
          padding-bottom: 4rem;
          background-color: var(--color-pure-white);
        }
        @media (min-width: 768px) {
          .how-it-works-section {
            padding-top: 6rem;
            padding-bottom: 6rem;
          }
        }
        .how-it-works-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }
        @media (min-width: 1024px) {
          .how-it-works-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .how-it-works-card {
          background-color: var(--color-cloud-grey);
          border-radius: 0.75rem;
          padding: 2rem;
          box-shadow: 0px 4px 12px rgba(0,0,0,0.05);
        }
        .how-it-works-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }
        .how-it-works-title.customer { color: var(--color-setu-blue); }
        .how-it-works-title.provider { color: var(--color-coastal-teal); }
        .how-it-works-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .how-it-works-item {
          display: flex;
          align-items: flex-start;
        }
        .how-it-works-step-number {
          flex-shrink: 0;
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          color: var(--color-pure-white);
          font-weight: 700;
          margin-right: 1rem;
        }
        .how-it-works-step-number.bg-setu-blue { background-color: var(--color-setu-blue); }
        .how-it-works-step-number.bg-coastal-teal { background-color: var(--color-coastal-teal); }
        .how-it-works-item-content h4 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--color-deep-slate);
        }
        .how-it-works-item-content p {
          color: var(--color-medium-slate);
        }
        /* Call to Action Section Styles */
        .cta-section {
          background-color: var(--color-marigold-glow);
          padding-top: 4rem;
          padding-bottom: 4rem;
          text-align: center;
          color: var(--color-pure-white);
        }
        @media (min-width: 768px) {
          .cta-section {
            padding-top: 6rem;
            padding-bottom: 6rem;
          }
        }
        .cta-title {
          font-size: 1.875rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }
        @media (min-width: 768px) {
          .cta-title {
            font-size: 2.25rem;
          }
        }
        .cta-description {
          font-size: 1.125rem;
          margin-bottom: 2.5rem;
          max-width: 42rem;
          margin-left: auto;
          margin-right: auto;
          opacity: 0.9;
        }
        @media (min-width: 768px) {
          .cta-description {
            font-size: 1.25rem;
          }
        }
        /* Footer Styles */
        .footer {
          background-color: var(--color-deep-slate);
          color: var(--color-pure-white);
          padding-top: 2.5rem;
          padding-bottom: 2.5rem;
          text-align: center;
        }
        .footer-text {
          color: var(--color-medium-slate);
        }
        .footer-logo-group {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--color-pure-white);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .footer-logo-group .setu-logo-icon {
          color: var(--color-marigold-glow);
        }
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          font-size: 0.875rem;
        }
        .footer-link {
          text-decoration: none;
          transition: color 0.2s ease-in-out;
          color: var(--color-medium-slate);
        }
        .footer-link:hover {
          color: var(--color-pure-white);
        }
        /* Animations */
        @keyframes fadeInFromBottom {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInFromBottom 0.6s ease-out forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>

      <div className="app-container">
        {/* Header/Navigation Section */}
        <header className="header">
          <div className="header-inner-content">
            <div className="header-logo-group">
              {/* Setu Logo SVG */}
              <svg
                className="setu-logo-icon"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                ></path>
              </svg>
              <div className="header-logo-text">Setu</div>
            </div>
            {/* Desktop Navigation Links */}
            <nav className="nav-links">
              <a href="#features" className="nav-link">
                Features
              </a>
              <a href="#how-it-works" className="nav-link">
                How It Works
              </a>
              <a href="#contact" className="nav-link">
                Contact
              </a>
            </nav>
            {/* Mobile Menu Button */}
            <button className="mobile-menu-button" onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
              <svg
                className="icon-24"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                )}
              </svg>
            </button>
          </div>
        </header>

        {/* Mobile Menu Backdrop (dimming) */}
        {isMobileMenuOpen && (
          <div
            className={`mobile-menu-backdrop ${isMobileMenuOpen ? "open" : ""}`}
            onClick={toggleMobileMenu}
          ></div>
        )}

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu-overlay ${isMobileMenuOpen ? "open" : ""}`}>
          <button
            className="mobile-menu-close-button"
            onClick={toggleMobileMenu}
            aria-label="Close mobile menu"
          >
            <svg
              className="icon-24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <a href="#features" className="nav-link" onClick={toggleMobileMenu}>Features</a>
          <a href="#how-it-works" className="nav-link" onClick={toggleMobileMenu}>How It Works</a>
          <a href="#contact" className="nav-link" onClick={toggleMobileMenu}>Contact</a>
          <a href="#" className="nav-link" onClick={toggleMobileMenu}>Book a Service</a>
          <a href="#" className="nav-link" onClick={toggleMobileMenu}>Become a Provider</a>
        </div>

        {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-content">
          <h1 className="hero-title animate-fade-in-up">
            Your <span>Local Services</span>, Instantly Connected.
          </h1>
          <p className="hero-description animate-fade-in-up delay-200">
            Setu seamlessly connects you with trusted professionals for
            immediate or scheduled service needs. Experience speed, reliability,
            and transparency.
          </p>
          <div className="hero-buttons animate-fade-in-up delay-400">
            <Link to="/signup" className="btn-primary">Get started</Link>

            <Link to="/signup" className="btn-secondary">
              Become a Provider
            </Link>
          </div>
        </div>
        <div className="hero-bg-pattern">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="currentColor"
              d="M0,160L48,176C96,192,192,224,288,208C384,192,480,128,576,122.7C672,117,768,171,864,186.7C960,203,1056,181,1152,170.7C1248,160,1344,160,1392,160L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <h2 className="section-title">
            Experience the <span>Setu</span> Difference
          </h2>
          <div className="features-grid">
            {/* Feature Cards */}
            {[
              {
                iconBg: "bg-setu-blue",
                icon: (
                  <svg
                    className="icon-24"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                ),
                title: "Real-Time Availability",
                desc: `See which professionals are available nearby "right now" and book instantly for immediate or last-minute needs.`,
              },
              {
                iconBg: "bg-marigold-glow",
                icon: (
                  <svg
                    className="icon-24"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 17l-4 4m0 0l4-4m-4 4h12a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                ),
                title: "Live Tracking",
                desc:
                  "Track your service provider's estimated arrival and real-time movement directly on the app, ensuring peace of mind.",
              },
              {
                iconBg: "bg-coastal-teal",
                icon: (
                  <svg
                    className="icon-24"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                ),
                title: "Lightning-Fast Booking",
                desc:
                  "Experience one-tap confirmation for both customers and providers, mirroring the efficiency of modern delivery apps.",
              },
              {
                iconBg: "bg-setu-blue",
                icon: (
                  <svg
                    className="icon-24"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 8h6m-5 0h.01M9 12h6m-5 0h.01M9 16h6m-5 0h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                ),
                title: "Transparent Pricing",
                desc:
                  "Clear, upfront cost estimates with no hidden fees, ensuring complete transparency before you book.",
              },
              {
                iconBg: "bg-marigold-glow",
                icon: (
                  <svg
                    className="icon-24"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                ),
                title: "Verified Professionals",
                desc:
                  "All service providers undergo a rigorous verification process to ensure quality, safety, and trustworthiness.",
              },
              {
                iconBg: "bg-coastal-teal",
                icon: (
                  <svg
                    className="icon-24"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    ></path>
                  </svg>
                ),
                title: "Secure In-App Payments",
                desc:
                  "Enjoy secure and convenient payment options directly within the app, adding credibility and safety to every transaction.",
              },
            ].map((card, idx) => (
              <div className="feature-card" key={idx}>
                <div className={`feature-icon-wrapper ${card.iconBg}`}>
                  {card.icon}
                </div>
                <h3 className="feature-title">{card.title}</h3>
                <p className="feature-description">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="container">
          <h2 className="section-title">
            How <span>Setu</span> Works
          </h2>
          <div className="how-it-works-grid">
            {/* Customers */}
            <div className="how-it-works-card">
              <h3 className="how-it-works-title customer">For Customers</h3>
              <ol className="how-it-works-list">
                <li className="how-it-works-item">
                  <div className="how-it-works-step-number bg-setu-blue">1</div>
                  <div className="how-it-works-item-content">
                    <h4>Search Your Need</h4>
                    <p>
                      Easily find the service you need by searching or browsing
                      categories like plumbing, electrical, cleaning, and more.
                    </p>
                  </div>
                </li>
                <li className="how-it-works-item">
                  <div className="how-it-works-step-number bg-setu-blue">2</div>
                  <div className="how-it-works-item-content">
                    <h4>View & Book Instantly</h4>
                    <p>
                      See real-time availability of trusted professionals nearby
                      and book with a single tap for immediate service.
                    </p>
                  </div>
                </li>
                <li className="how-it-works-item">
                  <div className="how-it-works-step-number bg-setu-blue">3</div>
                  <div className="how-it-works-item-content">
                    <h4>Track & Pay Securely</h4>
                    <p>
                      Track your professional's arrival live and complete secure
                      payments directly through the app after service.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
            {/* Service Providers */}
            <div className="how-it-works-card">
              <h3 className="how-it-works-title provider">For Service Providers</h3>
              <ol className="how-it-works-list">
                <li className="how-it-works-item">
                  <div className="how-it-works-step-number bg-coastal-teal">1</div>
                  <div className="how-it-works-item-content">
                    <h4>Create Your Profile</h4>
                    <p>
                      Set up your professional profile, list your services, and
                      highlight your expertise and availability.
                    </p>
                  </div>
                </li>
                <li className="how-it-works-item">
                  <div className="how-it-works-step-number bg-coastal-teal">2</div>
                  <div className="how-it-works-item-content">
                    <h4>Receive Instant Bookings</h4>
                    <p>
                      Get notified of new service requests from nearby customers
                      and accept jobs with one tap.
                    </p>
                  </div>
                </li>
                <li className="how-it-works-item">
                  <div className="how-it-works-step-number bg-coastal-teal">3</div>
                  <div className="how-it-works-item-content">
                    <h4>Manage & Grow</h4>
                    <p>
                      Utilize your provider dashboard to manage bookings, track
                      earnings, and grow your local business effortlessly.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Bridge the Gap?</h2>
          <p className="cta-description">
            Join the Setu community today and experience the future of local
            service booking.
          </p>
          <a href="#" className="btn-primary">
            Get Started Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-text">
          <div className="footer-logo-group">
            <img className="setu-logo-icon" />
            Setu
          </div>
          <p className="mb-4">&copy; 2025 Setu. All rights reserved.</p>
          <div className="footer-links">
            <a href="#" className="footer-link">
              Privacy Policy
            </a>
            <a href="#" className="footer-link">
              Terms of Service
            </a>
            <a href="#" className="footer-link">
              FAQ
            </a>
          </div>
        </div>
      </footer>
    </div>
     </>
  );
};
export default LandingPage;