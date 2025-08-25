import React, { useState, useEffect } from "react";

const GlobalStyles = () => (
  <style>
    {`
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
      /* Navbar and other styles inherited from your global CSS */
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
      .setu-logo-icon {
        width: 32px;
        height: 32px;
        stroke-width: 2.5px;
        fill: none;
        color: var(--color-setu-blue);
        margin-right: 0.5rem;
      }
      .header-logo-text {
        font-size: 1.8rem;
        font-weight: 800;
        color: var(--color-setu-blue);
        letter-spacing: -0.02em;
      }
      .sp-main {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 3rem 1.5rem;
        width: 100%;
        box-sizing: border-box;
        background-color: var(--color-cloud-grey);
      }
      .dashboard-header {
        width: 100%;
        max-width: 1200px;
        margin-bottom: 2rem;
        text-align: center;
      }
      .dashboard-title {
        font-size: 2.5rem;
        font-weight: 800;
        color: var(--color-deep-slate);
        margin-bottom: 1rem;
      }
      .nav-tabs {
        display: flex;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
        margin-bottom: 2rem;
      }
      .nav-tab-button {
        padding: 0.8rem 1.5rem;
        border-radius: 0.75rem;
        border: 1px solid var(--color-light-grey);
        background-color: var(--color-pure-white);
        color: var(--color-medium-slate);
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
      }
      .nav-tab-button:hover:not(.active) {
        background-color: var(--color-cloud-grey);
        color: var(--color-setu-blue);
      }
      .nav-tab-button.active {
        background-color: var(--color-setu-blue);
        color: var(--color-pure-white);
        border-color: var(--color-setu-blue);
        box-shadow: 0 4px 10px rgba(10, 77, 170, 0.2);
      }
      .dashboard-content {
        width: 100%;
        max-width: 1200px;
      }
      .services-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
        padding: 0 1rem 1rem 1rem;
      }
      @media (max-width: 900px) {
        .services-container {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      @media (max-width: 600px) {
        .services-container {
          grid-template-columns: 1fr;
        }
      }
      .service-card {
        min-width: 280px;
        max-width: 300px;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: var(--color-pure-white);
        border-radius: 1rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        padding: 1.5rem;
      }
      .service-image-container {
        width: 100%;
        height: 150px;
        overflow-x: auto;
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
      }
      .service-image-container::-webkit-scrollbar {
        display: none;
      }
      .service-card-image {
        height: 100%;
        width: auto;
        flex-shrink: 0;
        border-radius: 0.75rem;
        object-fit: cover;
      }
      .service-card-content h4 {
        font-size: 1.2rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
      }
      .service-card-content p {
        font-size: 0.9rem;
        color: var(--color-medium-slate);
        margin-bottom: 1rem;
        min-height: 60px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      .service-card-content .provider-name {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--color-setu-blue);
        margin-bottom: 0.75rem;
      }
      .action-button {
        padding: 0.6rem 1.2rem;
        border-radius: 0.5rem;
        background-color: var(--color-marigold-glow);
        color: var(--color-pure-white);
        border: none;
        cursor: pointer;
        font-weight: 600;
        transition: background-color 0.2s ease-in-out;
      }
      .action-button:hover {
        background-color: #e69d00;
      }
    `}
  </style>
);

const UserHomeTab = ({ userdata }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchActiveServices() {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8080/api/user/me", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userdata),
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to load services");
        const data = await res.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchActiveServices();
  }, []);

  if (loading) return <p>Loading services...</p>;
  if (error) return <p>Error loading services: {error}</p>;

  return (
    <div className="dashboard-content" role="main">
      <h1 className="dashboard-title">Explore Active Services</h1>
      <div className="services-container" aria-live="polite">
        {services.length === 0 ? (
          <p>No active services found at the moment.</p>
        ) : (
          services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-image-container">
                {service.imagesBase64?.length > 0 ? (
                  service.imagesBase64.map((img, idx) => (
                    <img
                      key={idx}
                      src={`data:image/png;base64,${img}`}
                      alt={`${service.name} image ${idx + 1}`}
                      className="service-card-image"
                    />
                  ))
                ) : (
                  <img
                    src="https://placehold.co/400x250/667085/FFFFFF?text=No+Image"
                    alt="No image available"
                    className="service-card-image"
                  />
                )}
              </div>
              <div className="service-card-content">
                <h4>{service.name}</h4>
                <p className="provider-name">
                  {service.serviceProviderName || "Unknown Provider"}
                </p>
                <h5>₹{service.servicePrice}/-</h5>
                <p>{service.description?.substring(0, 120) || "No description"}</p>
                <button
                  className="action-button"
                  onClick={() => alert(`Booking flow for ${service.name} will be added later.`)}
                  aria-label={`Book service ${service.name}`}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Example parent dashboard to integrate UserHomeTab
const UserDashboard = () => {
    
  const [activeTab, setActiveTab] = useState("Home");
const userdata = {
    userName: localStorage.getItem("userName") ,
    email: localStorage.getItem("email") ,
    providerId: 1,
  };
  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <UserHomeTab userdata={userdata} />;
      case "Orders":
        return <p>work in progress</p>;
      case "Reviews":
        return <p>work in progress</p>;;
      case "Reports":
       return <p>work in progress</p>;;
      default:
        return <UserHomeTab userdata={userdata} />;
    }
  };

  return (
    <>
      <GlobalStyles />
      <header className="dynamic-island-navbar" aria-label="User navigation">
        <div className="setu-logo-group" aria-label="Setu logo">
          <svg
            className="setu-logo-icon"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
            role="img"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            ></path>
          </svg>
          <div className="header-logo-text">Setu User</div>
        </div>
      </header>
      <main className="sp-main" role="main">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Welcome, {userdata.userName}!</h1>
          <nav className="nav-tabs" aria-label="User Dashboard Tabs">
            {["Home", "Orders", "Reviews", "Reports"].map((tab) => (
              <button
                key={tab}
                className={`nav-tab-button ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
                aria-current={activeTab === tab ? "page" : undefined}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        {renderContent()}
      </main>
    </>
  );
};

export default UserDashboard;
