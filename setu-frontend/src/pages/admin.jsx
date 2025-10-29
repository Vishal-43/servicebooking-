import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AdminUsersProvidersTable from "./displayuser";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import API_BASE_URL from '../config';

const GlobalStyles = () => (
    <style>
        {`:root {
  --color-setu-blue: #0A4DAA;
  --color-cloud-grey: #F2F4F7;
  --color-pure-white: #FFFFFF;
  --color-marigold-glow: #FFAF00;
  --color-success-green: #28A745;
  --color-alert-red: #D32F2F;
  --color-deep-slate: #333333;
  --color-medium-slate: #667085;
  --color-light-grey: #E0E0E0;
}

body {
  font-family: 'Inter', sans-serif;
  background: var(--color-cloud-grey);
  color: var(--color-deep-slate);
}

/* Navbar */
.dynamic-island-navbar {
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-pure-white);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  border-radius: 4rem;
  padding: 0.25rem 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  width: 80vw;
  max-width: 800px;
}

/* Logo and header */
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

/* Main dashboard layout */
.sp-main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1.5rem;
  width: 100%;
  background: var(--color-cloud-grey);
}

.dashboard-header {
  width: 100%;
  max-width: 1200px;
  margin-bottom: 2rem;
  text-align: center;
}
.dashboard-title {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: var(--color-deep-slate);
}
.nav-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.nav-tab-button {
  padding: 0.8rem 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid var(--color-light-grey);
  background: var(--color-pure-white);
  color: var(--color-medium-slate);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}
.nav-tab-button.active {
  background: var(--color-setu-blue);
  color: var(--color-pure-white);
  border-color: var(--color-setu-blue);
  box-shadow: 0 4px 10px rgba(10,77,170,0.2);
}

/* Card/grid system */
.dashboard-content {
  width: 100%;
  max-width: 1200px;
}
.services-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 0 1rem 1.5rem 1rem;
}
@media (max-width: 900px) {
  .services-container { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .services-container { grid-template-columns: 1fr; }
}
.service-card {
  background: var(--color-pure-white);
  border-radius: 1.3rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  padding: 1.4rem 1.2rem;
  min-width: 220px;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: box-shadow 0.15s;
}
.service-card:hover {
  box-shadow: 0 8px 28px rgba(10,77,170,0.15);
}

/* Action/button styles */
.action-button, .modal-save-button {
  padding: 0.6rem 1.2rem;
  border-radius: 0.5rem;
  background-color: var(--color-marigold-glow);
  color: var(--color-pure-white);
  border: none;
  cursor: pointer;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 2px;
  transition: background 0.2s;
}
.action-button:hover, .modal-save-button:hover {
  background: #e69d00;
}
.action-button[disabled] {
  background: var(--color-light-grey);
  color: #999;
  cursor: not-allowed;
}

/* Form styles */
.modal-form-group {
  margin-bottom: 1.2rem;
}
.modal-form-label {
  font-size: 0.97rem;
  font-weight: 600;
  color: var(--color-medium-slate);
  margin-bottom: 0.3rem;
  display: block;
}
.modal-form-input {
  width: 100%;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--color-light-grey);
  border-radius: 0.4rem;
  font-size: 1rem;
  color: var(--color-deep-slate);
  background: var(--color-cloud-grey);
  box-sizing: border-box;
  margin-bottom: 0.5rem;
}


/* Responsive tweaks */
@media (max-width: 900px) {
  .dashboard-header, .dashboard-content { max-width: 95vw; }
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

`}
    </style>
);



// --- DASHBOARD HOME ---
const AdminDashboardHome = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalServiceProviders: 0,
        totalServices: 0,
        totalReports: 0
    });
    const [loading, setLoading] = useState(true);
    const [redirectToLogin, setRedirectToLogin] = useState(false);

    useEffect(() => {
        async function fetchStats() {
            setLoading(true);
            try {
                const res = await fetch(`${API_BASE_URL}/api/admin/stats`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },

                    body: JSON.stringify(userdata),
                    credentials: "include",
                });
                if (res.status === 401) {
                    setRedirectToLogin(true);
                    return;
                }
                const data = await res.json();   // FIX: Parse JSON data
                setStats(data);                  // Now setStats gets correct data
            } catch (err) {
                setRedirectToLogin(true);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (redirectToLogin) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="dashboard-content">
            <div className="services-container" style={{ gap: "2rem" }}>
                <div className="service-card"><h2>{stats.totalUsers}</h2><p>No. of Users</p></div>
                <div className="service-card"><h2>{stats.totalServiceProviders}</h2><p>No. of Service Providers</p></div>
                <div className="service-card"><h2>{stats.totalServices}</h2><p>Active Services</p></div>
                <div className="service-card"><h2>{stats.totalReports}</h2><p>Reports</p></div>
            </div>
        </div>
    );
};


// --- USER/SERVICEPROVIDER MANAGEMENT ---
const AdminUsersTab = () => {
    const [users, setUsers] = useState([]);
    const [providers, setProviders] = useState([]);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    useEffect(() => {
        async function fetchAll() {
            const resU = await fetch(`${API_BASE_URL}/api/admin/users`, { method: "post", headers: { "Content-Type": "application/json" }, body: JSON.stringify(userdata), credentials: "include" });
            const resP = await fetch(`${API_BASE_URL}/api/admin/serviceproviders`, { method: "post", headers: { "Content-Type": "application/json" }, body: JSON.stringify(userdata), credentials: "include" });
            setUsers(await resU.json());
            setProviders(await resP.json());
        }
        fetchAll();
    }, []);
    const makeAdmin = async (e) => {
        e.preventDefault();
        setMessage("Processing...");
        const res = await fetch("/api/admin/makeadmin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
            credentials: "include"
        });
        if (res.ok) setMessage("Admin access granted.");
        else setMessage("Failed. Check email.");
        setEmail("");
    };
    return (
        <div className="dashboard-content">
            <form onSubmit={makeAdmin} className="modal-form-group" style={{ marginBottom: 24 }}>
                <label className="modal-form-label">Enter user's email to make admin:</label>
                <input className="modal-form-input" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
                <button className="modal-save-button" type="submit">Make Admin</button>
                {message && <div style={{ marginTop: 8, color: "#0A4DAA" }}>{message}</div>}
            </form>
            <div style={{ gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                <div>
                    <AdminUsersProvidersTable userdata={userdata} users={users} providers={providers} />
                </div>
            </div>
        </div>
    );
};

// --- REPORTS MANAGEMENT ---
const AdminReportsTab = () => {
    const [reports, setReports] = useState([]);
    useEffect(() => {
        async function fetchReports() {
            const res = await fetch(`${API_BASE_URL}/api/admin/reports`, { method: "post", headers: { "Content-Type": "application/json" }, body: JSON.stringify(userdata), credentials: "include" });
            setReports(await res.json());
        }
        fetchReports();
    }, []);
    const updateStatus = async (id, status) => {
        await fetch(`${API_BASE_URL}/api/admin/reports/status`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status,id }),
            credentials: "include"
        });
        setReports(r => r.map(rep => rep.id === id ? { ...rep, status } : rep));
    };
    return (


    

<div className="dashboard-content" style={{ maxWidth: 1200, margin: "0 auto" }}>
  <h2 className="dashboard-title" style={{ marginBottom: '1.5rem' }}>
    Reports Management
  </h2>
  <div
    className="services-container"
    style={{
      gap: "1.8rem",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
    }}
  >
    {reports.map((report) => {
      const isResolved = report.status === "Resolved";
      const toggleStatus = isResolved ? "Pending" : "Resolved";
      return (
        <div
          key={report.id}
          className="service-card"
          style={{
            padding: "1.6rem",
            borderRadius: "1rem",
            boxShadow: "0 8px 18px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#fff",
          }}
        >
          <div>
            
            <p style={{ color: "#444", marginBottom: "1rem", minHeight: 60 }}>
              {report.content}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
            <span
              style={{
                padding: "6px 12px",
                borderRadius: 20,
                backgroundColor: isResolved ? "#28a74520" : "#ffaf0020",
                color: isResolved ? "#28a745" : "#ffaf00",
                fontWeight: 600,
                fontSize: "0.85rem",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                userSelect: "none",
              }}
            >
              {isResolved ? (
                <>
                  <FaCheckCircle />
                  Resolved
                </>
              ) : (
                <>
                  <FaClock />
                  Pending
                </>
              )}
            </span>
            <p style={{ fontSize: 13, color: "#777", marginLeft: "auto" }}>
              Status updated
            </p>
          </div>

          <button
            className="action-button"
            style={{
              background: isResolved ? "#FFA000" : "#28A745",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "0.6rem 0",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer"
            }}
            onClick={() => updateStatus(report.id, toggleStatus)}
            aria-label={`Mark report ${report.title} as ${toggleStatus}`}
          >
            {isResolved ? <FaClock /> : <FaCheckCircle />}
            Mark {toggleStatus}
          </button>
        </div>
      );
    })}
  </div>
</div>


    );
};

// --- ALL SERVICES MANAGEMENT ---
const AdminServicesTab = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        async function fetchServices() {
            const res = await fetch(`${API_BASE_URL}/api/admin/services`, {method:"post",headers: { "Content-Type": "application/json" },body: JSON.stringify(userdata), credentials: "include" });
            setServices(await res.json());
        }
        fetchServices();
    }, []);
    const toggleActive = async (id, isActive) => {
        await fetch(`/api/admin/services/status`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ active: !isActive, id }),
            credentials: "include"
        });
        setServices(s => s.map(serv => serv.id === id ? { ...serv, active: !isActive } : serv));
    };
    return (
        <div className="dashboard-content">
  <h2 className="dashboard-title">All Services</h2>
  <div className="services-container" style={{ gap: "1.5rem" }}>
    {services.map(service => {
      const isActive = service.status?.toLowerCase() === "active";

      return (
        <div key={service.id} className="service-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 16 }}>
<div className="service-image-container" >
                {service.imagesBase64?.length > 0 ? (
                  service.imagesBase64.map((img, idx) => (
                    <img key={idx} src={`data:image/png;base64,${img}`} alt={`${service.name} image ${idx + 1}`} className="service-card-image" />
                  ))
                ) : (
                  <img src="https://placehold.co/400x250/667085/FFFFFF?text=No+Image" alt="No image available" className="service-card-image" />
                )}
              </div>
  
          <h3 style={{ marginBottom: 6 }}>{service.name}</h3>
          <p>Price: ₹{service.servicePrice}</p>
          <p>
            Status:{" "}
            <b style={{ color: isActive ? '#28A745' : '#D32F2F' }}>
              {service.status || (isActive ? "Active" : "Inactive")}
            </b>
          </p>
          <button
            className="action-button"
            style={{ background: isActive ? "#D32F2F" : "#28A745" }}
            onClick={() => toggleActive(service.id, isActive)}
            aria-label={`${isActive ? "Deactivate" : "Activate"} service ${service.name}`}
          >
            {isActive ? "Deactivate" : "Activate"}
          </button>
        </div>
      );
    })}
  </div>
</div>

    );
};



const userdata = {
    userName: localStorage.getItem("userName"),
    email: localStorage.getItem("email"),
    providerId: 1,
};

// --- ADMIN DASHBOARD WRAPPER ---
const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("Home");
    const [logout, setLogout] = useState(false);

    if (logout) return <Navigate to="/login" replace />;

    return (
        <>
            <GlobalStyles />
            <header className="dynamic-island-navbar" aria-label="Admin navigation">
                <div className="setu-logo-group" aria-label="Setu Admin logo" style={{ display: "flex", alignItems: "center", height: "70px" }}>
                    <svg className="setu-logo-icon" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" role="img">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                    </svg>
                    <div className="header-logo-text">Setu Admin</div>
                </div>
            </header>
            <main className="sp-main" role="main">
                <div className="dashboard-header">
                    <h1 className="dashboard-title" style={{ marginTop: "70px" }}>Welcome, Admin!</h1>
                    <nav className="nav-tabs" aria-label="Admin Dashboard Tabs">
                        {["Home", "Users", "Reports", "Services", "Logout"].map(tab => (
                            <button
                                key={tab}
                                className={`nav-tab-button ${activeTab === tab ? "active" : ""}`}
                                onClick={() => {
                                    if (tab === "Logout") { setLogout(true); } else { setActiveTab(tab); }
                                }}
                                aria-current={activeTab === tab ? "page" : undefined}
                            >{tab}</button>
                        ))}
                    </nav>
                </div>
                {activeTab === "Home" && <AdminDashboardHome />}
                {activeTab === "Users" && <AdminUsersTab />}
                {activeTab === "Reports" && <AdminReportsTab />}
                {activeTab === "Services" && <AdminServicesTab />}

            </main>
        </>
    );
};

export default AdminDashboard;
