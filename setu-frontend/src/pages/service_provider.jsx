import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import OrdersTab from './orders'; 
import ReviewsSummary from './reviews';
import MyServicesTab from './myservicestab';
import ReportsTab from "./reports";

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

      /* Dashboard Main Styles */
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

      /* MyServicesTab specific styles */
      .services-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
        padding-bottom: 1rem;
        padding-left: 1rem;
        padding-right: 1rem;
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
      .services-container::-webkit-scrollbar {
        height: 8px;
      }
      .services-container::-webkit-scrollbar-track {
        background: var(--color-light-grey);
        border-radius: 10px;
      }
      .services-container::-webkit-scrollbar-thumb {
        background-color: var(--color-setu-blue);
        border-radius: 10px;
        border: 2px solid var(--color-light-grey);
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
        height: 120px;
        overflow-x: auto;
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none; /* Hide scrollbar for images */
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
        font-size: 1.1rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
      }
      .service-card-content p {
        font-size: 0.85rem;
        color: var(--color-medium-slate);
        margin-bottom: 1rem;
        min-height: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      .service-card-actions {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: auto;
      }
      .add-service-card {
        min-width: 280px;
        max-width: 300px;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        cursor: pointer;
        border: 2px dashed var(--color-light-grey);
        transition: all 0.2s ease-in-out;
        background-color: var(--color-pure-white);
        border-radius: 1rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
      }
      .add-service-card:hover {
        border-color: var(--color-marigold-glow);
        background-color: #FAFAFA;
      }
      .add-service-card .add-icon {
        font-size: 3rem;
        color: var(--color-marigold-glow);
        margin-bottom: 0.5rem;
      }
      .add-service-card .add-text {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--color-medium-slate);
      }

      /* Reusable styles from Admin Dashboard */
      .action-button {
        padding: 0.4rem 0.8rem;
        border-radius: 0.4rem;
        font-size: 0.8rem;
        font-weight: 500;
        cursor: pointer;
        border: none;
        margin-right: 0.5rem;
        transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
      }
      .action-button.edit {
        background-color: var(--color-setu-blue);
        color: var(--color-pure-white);
      }
      .action-button.edit:hover {
        background-color: #083c8a;
        transform: translateY(-1px);
      }
      .action-button.deactivate {
        background-color: var(--color-marigold-glow);
        color: var(--color-pure-white);
      }
      .action-button.deactivate:hover {
        background-color: #e69d00;
        transform: translateY(-1px);
      }
      .action-button.delete {
        background-color: var(--color-alert-red);
        color: var(--color-pure-white);
      }
      .action-button.delete:hover {
        background-color: #b02222;
        transform: translateY(-1px);
      }
      .status-badge {
        display: inline-block;
        padding: 0.3em 0.6em;
        border-radius: 0.5em;
        font-size: 0.75em;
        font-weight: 600;
        text-transform: uppercase;
        color: var(--color-pure-white);
        margin-left: 0.5em;
      }
      .status-badge.active {
        background-color: var(--color-success-green);
      }
      .status-badge.deactivated {
        background-color: var(--color-alert-red);
      }

      /* Modal Styles */
      .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }
      .modal-content {
        background-color: var(--color-pure-white);
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
      }
      .modal-close-button {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--color-medium-slate);
      }
      .modal-close-button:hover {
        color: var(--color-deep-slate);
      }
      .modal-title {
        font-size: 1.8rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        color: var(--color-setu-blue);
      }
      .modal-form-group {
        margin-bottom: 1rem;
        text-align: left;
      }
      .modal-form-label {
        display: block;
        font-size: 0.9rem;
        font-weight: 500;
        color: var(--color-medium-slate);
        margin-bottom: 0.3rem;
      }
      .modal-form-input {
        width: 100%;
        padding: 0.6rem 0.8rem;
        border: 1px solid var(--color-light-grey);
        border-radius: 0.4rem;
        font-size: 0.9rem;
        color: var(--color-deep-slate);
        box-sizing: border-box;
      }
      .modal-image-preview-container {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.5rem;
      }
      .modal-image-preview {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 0.5rem;
        border: 1px solid var(--color-light-grey);
      }
      .modal-save-button {
        background-color: var(--color-marigold-glow);
        color: var(--color-pure-white);
        padding: 0.7rem 1.5rem;
        border-radius: 0.5rem;
        border: none;
        cursor: pointer;
        font-weight: 600;
        margin-top: 1.5rem;
        transition: background-color 0.2s ease-in-out;
      }
      .modal-save-button:hover {
        background-color: #e69d00;
      }

      /* Dashboard grid for Home overview */
      .dashboard-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      @media (min-width: 768px) {
        .dashboard-grid {
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        }
      }
      .dashboard-card {
        background-color: var(--color-pure-white);
        border-radius: 1rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        padding: 2rem;
        text-align: left;
        display: flex;
        flex-direction: column;
        transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
      }
      .dashboard-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
      }
      .card-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--color-deep-slate);
        margin-bottom: 1.5rem;
        border-bottom: 2px solid var(--color-light-grey);
        padding-bottom: 0.75rem;
      }
      .overview-metric {
        text-align: center;
        padding: 2rem;
      }
      .overview-metric h4 {
        font-size: 3rem;
        font-weight: 800;
        color: var(--color-setu-blue);
        margin: 0;
        line-height: 1;
      }
      .overview-metric p {
        font-size: 1rem;
        color: var(--color-medium-slate);
        margin-top: 0.5rem;
      }
      .placeholder-text {
        text-align: center;
        color: var(--color-medium-slate);
        padding: 4rem 1rem;
        font-size: 1.2rem;
      }
    `}
  </style>
);




// Mock static data for demo (replace with real backend data or props)

const HomeTab = ({ userdata }) => {
  const { services, orders, reviews } = userdata;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backendData, setBackendData] = useState(null);

  useEffect(() => {
    async function sendUserData() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:8080/api/service-provider/home", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(userdata),
  credentials: "include",
});

const text = await response.text();
console.log("Raw response text:", text);

try {
  const data = JSON.parse(text); // or response.json() normally
  setBackendData(data);
} catch (e) {
  setError("Invalid JSON response");
}

      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    if (userdata && userdata.userName) {
      sendUserData();
    } else {
      setLoading(false);
    }
  }, [userdata]);



  if (loading) return <p>Loading data from backend...</p>;
  if (error) return <p>Error loading data: {error}</p>;

  return (
    <div className="dashboard-content">
      <div className="dashboard-grid">
        <div className="dashboard-card overview-metric">
          <h4>{backendData.pendingCount}</h4>
          <p>New Orders</p>
        </div>
        <div className="dashboard-card overview-metric">
          <h4>{backendData.completedCount}</h4>
          <p>Completed Orders</p>
        </div>
        <div className="dashboard-card overview-metric">
          <h4>{(backendData.averageRating).toFixed(1)}</h4>
          <p>Total Reviews</p>
        </div>
        <div className="dashboard-card overview-metric">
          <h4>{backendData.serviceCount}</h4>
          <p>Services Offered</p>
        </div>
      </div>

      
    </div>
  );
};

const ServiceProviderDashboard = () => {
  const [activeTab, setActiveTab] = useState("Home");

  // Collect user data from localStorage or other session management logic
  const userdata = {
    userName: localStorage.getItem("userName") ,
    email: localStorage.getItem("email") ,
    providerId: 1,
  };

   const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <HomeTab userdata={userdata} />;
      case "My Services":
        
        return <MyServicesTab userdata={userdata} />;
      case "Orders":
        return  <OrdersTab userdata={userdata} />;
      case "Reviews":
        return <ReviewsSummary userdata={userdata} />;
      case "Reports":
        return <ReportsTab userdata={userdata} />;
      default:
        return <MyServicesTab userdata={userdata} />;
    }
  };


  return (
    <>
      <GlobalStyles />
      <div className="app-container">
        {/* Dynamic Island Navbar */}
        <header className="dynamic-island-navbar" aria-label="Setu Pro navigation">
          <div className="setu-logo-group" aria-label="Setu Pro logo">
            <svg
              className="setu-logo-icon"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              aria-hidden="true"
              role="img"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
            </svg>
            <div className="header-logo-text">Setu Pro</div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="sp-main">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Welcome, {userdata.userName}!</h1>
            <nav className="nav-tabs" aria-label="Dashboard Tabs">
              {["Home", "My Services", "Orders", "Reviews", "Reports"].map((tab) => (
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
      </div>
    </>
  );
};

export default ServiceProviderDashboard;
