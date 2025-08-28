import React from "react";
import { useNavigate } from "react-router-dom";

const RoleSelectionPage = () => {
  return (
    <>
      {/* Internal CSS injected */}
      <style>{`
        /* Base Styles from Previous Pages */
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

        body {
          font-family: 'Inter', sans-serif;
          color: var(--color-deep-slate);
          background-color: var(--color-cloud-grey);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          margin: 0;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          min-height: 100vh;
          box-sizing: border-box;
          padding-top: 3.5rem;
        }
        @media (max-width: 400px) {
          body {
            padding-top: 4rem;
          }
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Poppins', sans-serif;
        }

        /* Dynamic Island Navbar Styles */
        .dynamic-island-navbar {
          position: fixed;
          top: 1rem;
          left: 50%;
          transform: translateX(-50%);
          background-color: var(--color-pure-white);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          border-radius: 4rem;
          padding: 0.25rem 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 200;
          width: 80vw;
          max-width: 800px;
          transition: all 0.3s ease-in-out;
          height: auto;
        }
        @media (max-width: 768px) {
          .dynamic-island-navbar {
            width: 90vw;
            padding: 0.2rem 2rem;
            border-radius: 3rem;
          }
        }
        @media (max-width: 480px) {
          .dynamic-island-navbar {
            width: 95vw;
            padding: 0.15rem 1.5rem;
            border-radius: 2.5rem;
          }
        }

        .setu-logo-icon {
          width: 32px;
          height: 32px;
          stroke-width: 2.5px;
          fill: none;
          color: var(--color-setu-blue);
          margin-right: 0.5rem;
        }
        @media (max-width: 480px) {
          .setu-logo-icon {
            width: 28px;
            height: 28px;
          }
        }

        .header-logo-text {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--color-setu-blue);
          letter-spacing: -0.02em;
        }
        @media (max-width: 480px) {
          .header-logo-text {
            font-size: 1.5rem;
          }
        }

        /* Role Selection Page Specific Styles */
        .role-selection-main {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 3rem 1.5rem;
          width: 100%;
          box-sizing: border-box;
        }

        .role-selection-title {
          font-size: 2.25rem;
          font-weight: 700;
          color: var(--color-deep-slate);
          margin-bottom: 2.5rem;
          text-align: center;
        }

        .role-selection-grid {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          width: 100%;
          max-width: 800px;
        }
        @media (min-width: 768px) {
          .role-selection-grid {
            flex-direction: row;
            justify-content: center;
          }
        }

        .role-card {
          background-color: var(--color-pure-white);
          border-radius: 1rem;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          padding: 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          min-height: 250px;
          position: relative;
          overflow: hidden;
        }

        .role-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
          border-color: var(--color-setu-blue);
        }

        .role-card-icon {
          width: 60px;
          height: 60px;
          stroke-width: 2px;
          fill: none;
          margin-bottom: 1rem;
          transition: transform 0.3s ease-in-out;
        }
        .role-card:hover .role-card-icon {
          transform: scale(1.1);
        }

        .role-card-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: var(--color-deep-slate);
        }

        .role-card-description {
          font-size: 0.95rem;
          color: var(--color-medium-slate);
          line-height: 1.6;
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.4s ease-out, opacity 0.4s ease-out;
          margin-top: 0;
          padding-top: 0;
        }

        .role-card:hover .role-card-description {
          max-height: 150px;
          opacity: 1;
          margin-top: 1rem;
        }

        .role-card.customer .role-card-icon {
          color: var(--color-setu-blue);
        }
        .role-card.provider .role-card-icon {
          color: var(--color-coastal-teal);
        }

        .role-card.customer:hover {
          border: 2px solid var(--color-setu-blue);
        }
        .role-card.provider:hover {
          border: 2px solid var(--color-coastal-teal);
        }

        .role-card-button {
          background-color: var(--color-marigold-glow);
          color: var(--color-pure-white);
          font-weight: 600;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          border: none;
          cursor: pointer;
          margin-top: 1.5rem;
          transition: all 0.3s ease-in-out;
          box-shadow: 0 4px 10px rgba(255, 175, 0, 0.2);
          text-decoration: none;
          display: inline-block;
        }

        .role-card-button:hover {
          background-color: #e69d00;
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(255, 175, 0, 0.3);
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

      {/* Component JSX */}
      <div className="app-container">
        {/* Dynamic Island Navbar */}
        <header className="dynamic-island-navbar">
          <div
            className="setu-logo-group"
            style={{ display: "flex", alignItems: "center" }}
          >
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
        </header>

        {/* Main Role Selection Content */}
        <main className="role-selection-main">
          <h1 className="role-selection-title animate-fade-in-up">
            Join Setu: Choose Your Path
          </h1>
          <div className="role-selection-grid">
            {/* Customer Role Card */}
            <div className="role-card customer">
              <svg
                className="role-card-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
              <h2 className="role-card-title">I Need a Service</h2>
              <p className="role-card-description">
                As a customer, easily find and book trusted local
                professionals for your immediate or scheduled needs. Experience
                convenience, transparency, and reliable service at your
                fingertips.
              </p>
              <a href="/profile-completion" className="role-card-button">
                Continue as Customer
              </a>
            </div>

            {/* Service Provider Role Card */}
            <div className="role-card provider">
              <svg
                className="role-card-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 13.255A23.565 23.565 0 0112 15c-3.185 0-6.279-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
              <h2 className="role-card-title">I Provide a Service</h2>
              <p className="role-card-description">
                Join our network of verified professionals to connect with
                local customers seeking your expertise. Grow your business,
                manage bookings efficiently, and get paid securely.
              </p>
              <a href="service-provider-details" className="role-card-button">
                Continue as Provider
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default RoleSelectionPage;
