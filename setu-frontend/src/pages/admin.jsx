// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Setu - Admin Dashboard</title>
//     <!-- Google Fonts for Poppins and Inter -->
//     <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">

//     <!-- React and ReactDOM CDNs -->
//     <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
//     <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
//     <!-- Babel Standalone for JSX transformation in browser -->
//     <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

//     <style>
//         /* Base Styles (Reused from Previous Pages) */
//         :root {
//             --color-setu-blue: #0A4DAA;
//             --color-cloud-grey: #F2F4F7;
//             --color-pure-white: #FFFFFF;
//             --color-marigold-glow: #FFAF00;
//             --color-coastal-teal: #009688;
//             --color-success-green: #28A745;
//             --color-alert-red: #D32F2F;
//             --color-deep-slate: #333333;
//             --color-medium-slate: #667085;
//             --color-light-grey: #E0E0E0;
//             --color-dark-overlay: rgba(0, 0, 0, 0.6);
//         }

//         body {
//             font-family: 'Inter', sans-serif;
//             color: var(--color-deep-slate);
//             background-color: var(--color-cloud-grey);
//             -webkit-font-smoothing: antialiased;
//             -moz-osx-font-smoothing: grayscale;
//             margin: 0;
//             overflow-x: hidden;
//             display: flex;
//             flex-direction: column;
//             justify-content: flex-start;
//             align-items: center;
//             min-height: 100vh;
//             box-sizing: border-box;
//             padding-top: 3.5rem; /* Adjusted padding to account for very short navbar */
//             @media (max-width: 400px) {
//                 padding-top: 4rem;
//             }
//         }

//         h1, h2, h3, h4, h5, h6 {
//             font-family: 'Poppins', sans-serif;
//         }

//         /* Dynamic Island Navbar Styles (Reused) */
//         .dynamic-island-navbar {
//             position: fixed;
//             top: 1rem;
//             left: 50%;
//             transform: translateX(-50%);
//             background-color: var(--color-pure-white);
//             box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
//             border-radius: 4rem;
//             padding: 0.25rem 3rem;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             z-index: 200;
//             width: 80vw;
//             max-width: 800px;
//             transition: all 0.3s ease-in-out;
//             height: auto;
//         }
//         @media (max-width: 768px) {
//             .dynamic-island-navbar {
//                 width: 90vw;
//                 padding: 0.2rem 2rem;
//                 border-radius: 3rem;
//             }
//         }
//         @media (max-width: 480px) {
//             .dynamic-island-navbar {
//                 width: 95vw;
//                 padding: 0.15rem 1.5rem;
//                 border-radius: 2.5rem;
//             }
//         }
//         .setu-logo-icon {
//             width: 32px;
//             height: 32px;
//             stroke-width: 2.5px;
//             fill: none;
//             color: var(--color-setu-blue);
//             margin-right: 0.5rem;
//         }
//         @media (max-width: 480px) {
//             .setu-logo-icon {
//                 width: 28px;
//                 height: 28px;
//             }
//         }
//         .header-logo-text {
//             font-size: 1.8rem;
//             font-weight: 800;
//             color: var(--color-setu-blue);
//             letter-spacing: -0.02em;
//         }
//         @media (max-width: 480px) {
//             .header-logo-text {
//                 font-size: 1.5rem;
//             }
//         }

//         /* Admin Dashboard Specific Styles */
//         .admin-main {
//             flex-grow: 1;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             padding: 3rem 1.5rem;
//             width: 100%;
//             box-sizing: border-box;
//             background-color: var(--color-cloud-grey);
//         }

//         .dashboard-header {
//             width: 100%;
//             max-width: 1200px;
//             margin-bottom: 2rem;
//             text-align: center;
//         }

//         .dashboard-title {
//             font-size: 2.5rem;
//             font-weight: 800;
//             color: var(--color-deep-slate);
//             margin-bottom: 1rem;
//         }

//         .nav-tabs {
//             display: flex;
//             justify-content: center;
//             gap: 1rem;
//             flex-wrap: wrap;
//             margin-bottom: 2rem;
//         }
//         .nav-tab-button {
//             padding: 0.8rem 1.5rem;
//             border-radius: 0.75rem;
//             border: 1px solid var(--color-light-grey);
//             background-color: var(--color-pure-white);
//             color: var(--color-medium-slate);
//             font-weight: 600;
//             cursor: pointer;
//             transition: all 0.2s ease-in-out;
//             box-shadow: 0 2px 5px rgba(0,0,0,0.05);
//         }
//         .nav-tab-button:hover:not(.active) {
//             background-color: var(--color-cloud-grey);
//             color: var(--color-setu-blue);
//         }
//         .nav-tab-button.active {
//             background-color: var(--color-setu-blue);
//             color: var(--color-pure-white);
//             border-color: var(--color-setu-blue);
//             box-shadow: 0 4px 10px rgba(10, 77, 170, 0.2);
//         }

//         .dashboard-content {
//             width: 100%;
//             max-width: 1200px;
//         }

//         .dashboard-grid {
//             display: grid;
//             grid-template-columns: 1fr; /* Single column on mobile */
//             gap: 2rem;
//         }

//         @media (min-width: 768px) {
//             .dashboard-grid {
//                 grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); /* Responsive columns */
//             }
//         }
//         @media (min-width: 1024px) {
//             .dashboard-grid {
//                 grid-template-columns: repeat(3, 1fr); /* 3 columns for home overview */
//             }
//             /* Specific layout for Manage Users/Services/Reports */
//             .dashboard-grid.manage-section {
//                 grid-template-columns: 1fr; /* Full width for tables */
//             }
//             .dashboard-grid.manage-section .dashboard-card {
//                 grid-column: 1 / -1; /* Make card span full width */
//             }
//         }


//         .dashboard-card {
//             background-color: var(--color-pure-white);
//             border-radius: 1rem;
//             box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
//             padding: 2rem;
//             text-align: left;
//             display: flex;
//             flex-direction: column;
//         }

//         .card-title {
//             font-size: 1.5rem;
//             font-weight: 700;
//             color: var(--color-deep-slate);
//             margin-bottom: 1.5rem;
//             border-bottom: 2px solid var(--color-light-grey);
//             padding-bottom: 0.75rem;
//         }

//         /* Home Overview Specific Styles */
//         .overview-metric {
//             text-align: center;
//             padding: 1rem;
//         }
//         .overview-metric h4 {
//             font-size: 2.5rem;
//             font-weight: 800;
//             color: var(--color-setu-blue);
//             margin-bottom: 0.5rem;
//         }
//         .overview-metric p {
//             font-size: 1rem;
//             color: var(--color-medium-slate);
//             margin: 0;
//         }

//         /* Table Styles */
//         .data-table {
//             width: 100%;
//             border-collapse: collapse;
//             margin-top: 1rem;
//             font-size: 0.9rem;
//         }
//         .data-table th, .data-table td {
//             padding: 0.75rem 0.5rem;
//             border-bottom: 1px solid var(--color-cloud-grey);
//             text-align: left;
//         }
//         .data-table th {
//             background-color: var(--color-cloud-grey);
//             font-weight: 600;
//             color: var(--color-medium-slate);
//             text-transform: uppercase;
//         }
//         .data-table tbody tr:hover {
//             background-color: #f9f9f9;
//         }

//         .action-button {
//             padding: 0.4rem 0.8rem;
//             border-radius: 0.4rem;
//             font-size: 0.8rem;
//             font-weight: 500;
//             cursor: pointer;
//             border: none;
//             margin-right: 0.5rem;
//             transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
//         }
//         .action-button.edit { background-color: var(--color-setu-blue); color: var(--color-pure-white); }
//         .action-button.edit:hover { background-color: #083c8a; transform: translateY(-1px); }
//         .action-button.block { background-color: var(--color-marigold-glow); color: var(--color-pure-white); }
//         .action-button.block:hover { background-color: #e69d00; transform: translateY(-1px); }
//         .action-button.unblock { background-color: var(--color-coastal-teal); color: var(--color-pure-white); }
//         .action-button.unblock:hover { background-color: #007a6d; transform: translateY(-1px); }
//         .action-button.delete { background-color: var(--color-alert-red); color: var(--color-pure-white); }
//         .action-button.delete:hover { background-color: #b02222; transform: translateY(-1px); }
//         .action-button.view { background-color: var(--color-medium-slate); color: var(--color-pure-white); }
//         .action-button.view:hover { background-color: #5a647a; transform: translateY(-1px); }
//         .action-button.resolve { background-color: var(--color-success-green); color: var(--color-pure-white); }
//         .action-button.resolve:hover { background-color: #208e3a; transform: translateY(-1px); }

//         .filter-buttons {
//             margin-bottom: 1.5rem;
//             display: flex;
//             gap: 0.75rem;
//             flex-wrap: wrap;
//         }
//         .filter-button {
//             padding: 0.6rem 1.2rem;
//             border-radius: 0.5rem;
//             border: 1px solid var(--color-light-grey);
//             background-color: var(--color-pure-white);
//             color: var(--color-medium-slate);
//             font-weight: 500;
//             cursor: pointer;
//             transition: all 0.2s ease-in-out;
//         }
//         .filter-button.active {
//             background-color: var(--color-setu-blue);
//             color: var(--color-pure-white);
//             border-color: var(--color-setu-blue);
//         }
//         .filter-button:hover:not(.active) {
//             background-color: var(--color-cloud-grey);
//         }

//         .status-badge {
//             display: inline-block;
//             padding: 0.3em 0.6em;
//             border-radius: 0.5em;
//             font-size: 0.75em;
//             font-weight: 600;
//             text-transform: uppercase;
//             color: var(--color-pure-white);
//             margin-left: 0.5em;
//         }
//         .status-badge.active { background-color: var(--color-success-green); }
//         .status-badge.blocked { background-color: var(--color-alert-red); }
//         .status-badge.pending { background-color: var(--color-marigold-glow); }
//         .status-badge.resolved { background-color: var(--color-coastal-teal); }
//         .status-badge.new { background-color: var(--color-marigold-glow); }
//         .status-badge.approved { background-color: var(--color-success-green); }

//         /* Modal Styles */
//         .modal-backdrop {
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background-color: rgba(0, 0, 0, 0.5);
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             z-index: 1000;
//         }
//         .modal-content {
//             background-color: var(--color-pure-white);
//             padding: 2rem;
//             border-radius: 1rem;
//             box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
//             max-width: 500px;
//             width: 90%;
//             max-height: 90vh;
//             overflow-y: auto;
//             position: relative;
//         }
//         .modal-close-button {
//             position: absolute;
//             top: 1rem;
//             right: 1rem;
//             background: none;
//             border: none;
//             font-size: 1.5rem;
//             cursor: pointer;
//             color: var(--color-medium-slate);
//         }
//         .modal-close-button:hover {
//             color: var(--color-deep-slate);
//         }
//         .modal-title {
//             font-size: 1.8rem;
//             font-weight: 700;
//             margin-bottom: 1.5rem;
//             color: var(--color-setu-blue);
//         }
//         .modal-form-group {
//             margin-bottom: 1rem;
//             text-align: left;
//         }
//         .modal-form-label {
//             display: block;
//             font-size: 0.9rem;
//             font-weight: 500;
//             color: var(--color-medium-slate);
//             margin-bottom: 0.3rem;
//         }
//         .modal-form-input {
//             width: 100%;
//             padding: 0.6rem 0.8rem;
//             border: 1px solid var(--color-light-grey);
//             border-radius: 0.4rem;
//             font-size: 0.9rem;
//             color: var(--color-deep-slate);
//             box-sizing: border-box;
//         }
//         .modal-save-button {
//             background-color: var(--color-marigold-glow);
//             color: var(--color-pure-white);
//             padding: 0.7rem 1.5rem;
//             border-radius: 0.5rem;
//             border: none;
//             cursor: pointer;
//             font-weight: 600;
//             margin-top: 1.5rem;
//             transition: background-color 0.2s ease-in-out;
//         }
//         .modal-save-button:hover {
//             background-color: #e69d00;
//         }

//         /* Form styles for Manage Categories */
//         .add-category-form {
//             display: flex;
//             flex-direction: column;
//             gap: 1rem;
//             margin-bottom: 2rem;
//         }
//         .add-category-form input {
//             padding: 0.75rem 1rem;
//             border: 1px solid var(--color-light-grey);
//             border-radius: 0.5rem;
//             font-size: 1rem;
//         }
//         .add-category-form button {
//             padding: 0.75rem 1.5rem;
//             background-color: var(--color-setu-blue);
//             color: var(--color-pure-white);
//             border: none;
//             border-radius: 0.5rem;
//             cursor: pointer;
//             font-weight: 600;
//             transition: background-color 0.2s ease-in-out;
//         }
//         .add-category-form button:hover {
//             background-color: #083c8a;
//         }
//     </style>
// </head>
// <body>
//     <div id="root"></div> <!-- This is where your React app will be mounted -->

//     <script type="text/babel">
//         const { useState, useEffect } = React;

//         // --- Mock Data Simulation (More comprehensive for different tabs) ---
//         const initialUsers = [
//             { id: 'u1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Customer', status: 'Active', phone: '1112223333', dob: '1990-05-15', address: '123 Pine St, City, State, 123456' },
//             { id: 'sp1', name: 'Bob Smith', email: 'bob@service.com', role: 'Service Provider', status: 'Active', phone: '4445556666', businessName: 'Bob\'s Plumbing', category: 'Plumbing', services: 'Drain Cleaning, Leak Repair', license: 'PL-001', address: '456 Oak Ave, Town, State, 654321' },
//             { id: 'u2', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Customer', status: 'Blocked', phone: '7778889999', dob: '1988-11-20', address: '789 Elm Rd, Village, State, 987654' },
//             { id: 'sp2', name: 'Diana Prince', email: 'diana@electric.com', role: 'Service Provider', status: 'Active', phone: '1011121314', businessName: 'Wonder Electric', category: 'Electrical', services: 'Wiring, Installations', license: 'EL-002', address: '101 Hero Blvd, Metropolis, State, 102030' },
//         ];

//         const initialReports = [
//             { id: 'r1', reportedBy: 'Alice Johnson', reportedUser: 'Bob Smith', issue: 'Late for appointment', status: 'Pending', date: '2025-07-28' },
//             { id: 'r2', reportedBy: 'Charlie Brown', reportedUser: 'Wonder Electric', issue: 'Unprofessional behavior', status: 'Pending', date: '2025-07-29' },
//             { id: 'r3', reportedBy: 'Bob Smith', reportedUser: 'Alice Johnson', issue: 'Payment dispute', status: 'Resolved', date: '2025-07-25' },
//         ];

//         const initialServices = [
//             { id: 'serv1', providerId: 'sp1', providerName: 'Bob Smith', category: 'Plumbing', serviceName: 'Drain Cleaning', description: 'Clearing clogged drains.', status: 'Active' },
//             { id: 'serv2', providerId: 'sp1', providerName: 'Bob Smith', category: 'Plumbing', serviceName: 'Leak Repair', description: 'Fixing leaky pipes and faucets.', status: 'Active' },
//             { id: 'serv3', providerId: 'sp2', providerName: 'Diana Prince', category: 'Electrical', serviceName: 'House Rewiring', description: 'Complete electrical rewiring for homes.', status: 'Active' },
//             { id: 'serv4', providerId: 'sp2', providerName: 'Diana Prince', category: 'Electrical', serviceName: 'Fixture Installation', description: 'Installation of lights, fans, outlets.', status: 'Pending Approval' },
//         ];

//         const initialCategories = [
//             { id: 'cat1', name: 'Plumbing' },
//             { id: 'cat2', name: 'Electrical' },
//             { id: 'cat3', name: 'Carpentry' },
//             { id: 'cat4', name: 'HVAC' },
//             { id: 'cat5', name: 'Cleaning' },
//             { id: 'cat6', name: 'Gardening' },
//             { id: 'cat7', name: 'Pest Control' },
//             { id: 'cat8', name: 'IT Support' },
//         ];

//         const initialOrders = [
//             { id: 'o1', customerName: 'Alice Johnson', providerName: 'Bob Smith', service: 'Drain Cleaning', status: 'Completed', amount: 50, date: '2025-07-28' },
//             { id: 'o2', customerName: 'Charlie Brown', providerName: 'Wonder Electric', service: 'Fixture Installation', status: 'Pending', amount: 75, date: '2025-07-30' },
//         ];

//         // --- Components for each tab ---

//         const HomeTab = ({ users, services, orders }) => {
//             const numCustomers = users.filter(u => u.role === 'Customer').length;
//             const numProviders = users.filter(u => u.role === 'Service Provider').length;
//             const numActiveServices = services.filter(s => s.status === 'Active').length;
//             const numPendingOrders = orders.filter(o => o.status === 'Pending').length;

//             return (
//                 <div className="dashboard-grid">
//                     <div className="dashboard-card overview-metric">
//                         <h4>{numCustomers}</h4>
//                         <p>Total Customers</p>
//                     </div>
//                     <div className="dashboard-card overview-metric">
//                         <h4>{numProviders}</h4>
//                         <p>Total Service Providers</p>
//                     </div>
//                     <div className="dashboard-card overview-metric">
//                         <h4>{numActiveServices}</h4>
//                         <p>Active Services</p>
//                     </div>
//                     <div className="dashboard-card overview-metric">
//                         <h4>{orders.length}</h4>
//                         <p>Total Orders</p>
//                     </div>
//                     <div className="dashboard-card overview-metric">
//                         <h4>{numPendingOrders}</h4>
//                         <p>Pending Orders</p>
//                     </div>
//                     <div className="dashboard-card overview-metric">
//                         <h4>{orders.reduce((sum, order) => sum + order.amount, 0)}</h4>
//                         <p>Total Revenue (Simulated)</p>
//                     </div>
//                 </div>
//             );
//         };

//         const ManageUsersTab = ({ users, setUsers, handleViewUser, handleEditUser, handleBlockToggle, handleDeleteUser }) => {
//             const [filterRole, setFilterRole] = useState('All');

//             const filteredUsers = users.filter(user => {
//                 if (filterRole === 'All') return true;
//                 return user.role === filterRole;
//             });

//             return (
//                 <div className="dashboard-grid manage-section">
//                     <div className="dashboard-card">
//                         <h3 className="card-title">User & Service Provider Management</h3>
//                         <div className="filter-buttons">
//                             <button
//                                 className={`filter-button ${filterRole === 'All' ? 'active' : ''}`}
//                                 onClick={() => setFilterRole('All')}
//                             >
//                                 All Accounts
//                             </button>
//                             <button
//                                 className={`filter-button ${filterRole === 'Customer' ? 'active' : ''}`}
//                                 onClick={() => setFilterRole('Customer')}
//                             >
//                                 Customers
//                             </button>
//                             <button
//                                 className={`filter-button ${filterRole === 'Service Provider' ? 'active' : ''}`}
//                                 onClick={() => setFilterRole('Service Provider')}
//                             >
//                                 Service Providers
//                             </button>
//                         </div>
//                         <div style={{ overflowX: 'auto' }}>
//                             <table className="data-table">
//                                 <thead>
//                                     <tr>
//                                         <th>Name</th>
//                                         <th>Role</th>
//                                         <th>Status</th>
//                                         <th>Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {filteredUsers.length > 0 ? (
//                                         filteredUsers.map(user => (
//                                             <tr key={user.id}>
//                                                 <td>{user.name}</td>
//                                                 <td>{user.role}</td>
//                                                 <td>
//                                                     <span className={`status-badge ${user.status === 'Active' ? 'active' : 'blocked'}`}>
//                                                         {user.status}
//                                                     </span>
//                                                 </td>
//                                                 <td>
//                                                     <button className="action-button view" onClick={() => handleViewUser(user)}>View</button>
//                                                     <button className="action-button edit" onClick={() => handleEditUser(user)}>Edit</button>
//                                                     <button
//                                                         className={`action-button ${user.status === 'Active' ? 'block' : 'unblock'}`}
//                                                         onClick={() => handleBlockToggle(user.id)}
//                                                     >
//                                                         {user.status === 'Active' ? 'Block' : 'Unblock'}
//                                                     </button>
//                                                     <button className="action-button delete" onClick={() => handleDeleteUser(user.id)}>Delete</button>
//                                                 </td>
//                                             </tr>
//                                         ))
//                                     ) : (
//                                         <tr>
//                                             <td colSpan="4" style={{ textAlign: 'center', padding: '1rem' }}>No accounts found for this filter.</td>
//                                         </tr>
//                                     )}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             );
//         };

//         const ManageServicesTab = ({ services, setServices }) => {
//             const handleServiceStatusChange = (id, newStatus) => {
//                 setServices(prevServices =>
//                     prevServices.map(service =>
//                         service.id === id ? { ...service, status: newStatus } : service
//                     )
//                 );
//                 console.log(`Service ${id} status changed to ${newStatus}.`);
//             };

//             const handleDeleteService = (id) => {
//                 if (window.confirm('Are you sure you want to delete this service?')) {
//                     setServices(prevServices => prevServices.filter(service => service.id !== id));
//                     console.log(`Service ${id} deleted.`);
//                 }
//             };

//             return (
//                 <div className="dashboard-grid manage-section">
//                     <div className="dashboard-card">
//                         <h3 className="card-title">Manage Services Offered</h3>
//                         <div style={{ overflowX: 'auto' }}>
//                             <table className="data-table">
//                                 <thead>
//                                     <tr>
//                                         <th>Service Name</th>
//                                         <th>Category</th>
//                                         <th>Provider</th>
//                                         <th>Description</th>
//                                         <th>Status</th>
//                                         <th>Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {services.length > 0 ? (
//                                         services.map(service => (
//                                             <tr key={service.id}>
//                                                 <td>{service.serviceName}</td>
//                                                 <td>{service.category}</td>
//                                                 <td>{service.providerName}</td>
//                                                 <td>{service.description}</td>
//                                                 <td>
//                                                     <span className={`status-badge ${service.status === 'Active' ? 'active' : service.status === 'Pending Approval' ? 'pending' : ''}`}>
//                                                         {service.status}
//                                                     </span>
//                                                 </td>
//                                                 <td>
//                                                     {service.status === 'Pending Approval' && (
//                                                         <button className="action-button resolve" onClick={() => handleServiceStatusChange(service.id, 'Active')}>Approve</button>
//                                                     )}
//                                                     {service.status === 'Active' && (
//                                                         <button className="action-button block" onClick={() => handleServiceStatusChange(service.id, 'Inactive')}>Deactivate</button>
//                                                     )}
//                                                     <button className="action-button delete" onClick={() => handleDeleteService(service.id)}>Delete</button>
//                                                 </td>
//                                             </tr>
//                                         ))
//                                     ) : (
//                                         <tr>
//                                             <td colSpan="6" style={{ textAlign: 'center', padding: '1rem' }}>No services found.</td>
//                                         </tr>
//                                     )}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             );
//         };

//         const ManageCategoriesTab = ({ categories, setCategories }) => {
//             const [newCategoryName, setNewCategoryName] = useState('');

//             const handleAddCategory = (e) => {
//                 e.preventDefault();
//                 if (newCategoryName.trim()) {
//                     const newId = `cat${categories.length + 1}`;
//                     setCategories(prevCategories => [...prevCategories, { id: newId, name: newCategoryName.trim() }]);
//                     setNewCategoryName('');
//                     console.log(`Added new category: ${newCategoryName}`);
//                 }
//             };

//             const handleDeleteCategory = (id) => {
//                 if (window.confirm('Are you sure you want to delete this category?')) {
//                     setCategories(prevCategories => prevCategories.filter(cat => cat.id !== id));
//                     console.log(`Category ${id} deleted.`);
//                 }
//             };

//             return (
//                 <div className="dashboard-grid manage-section">
//                     <div className="dashboard-card">
//                         <h3 className="card-title">Manage Service Categories</h3>
//                         <form onSubmit={handleAddCategory} className="add-category-form">
//                             <input
//                                 type="text"
//                                 placeholder="New Category Name"
//                                 value={newCategoryName}
//                                 onChange={(e) => setNewCategoryName(e.target.value)}
//                                 required
//                             />
//                             <button type="submit">Add Category</button>
//                         </form>
//                         <div style={{ overflowX: 'auto' }}>
//                             <table className="data-table">
//                                 <thead>
//                                     <tr>
//                                         <th>Category Name</th>
//                                         <th>Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {categories.length > 0 ? (
//                                         categories.map(category => (
//                                             <tr key={category.id}>
//                                                 <td>{category.name}</td>
//                                                 <td>
//                                                     <button className="action-button delete" onClick={() => handleDeleteCategory(category.id)}>Delete</button>
//                                                 </td>
//                                             </tr>
//                                         ))
//                                     ) : (
//                                         <tr>
//                                             <td colSpan="2" style={{ textAlign: 'center', padding: '1rem' }}>No categories found.</td>
//                                         </tr>
//                                     )}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             );
//         };

//         const ReportsTab = ({ reports, setReports, users, handleViewUser }) => {
//             const handleResolveReport = (id) => {
//                 setReports(prevReports =>
//                     prevReports.map(report =>
//                         report.id === id ? { ...report, status: 'Resolved' } : report
//                     )
//                 );
//                 console.log(`Report ${id} resolved.`);
//             };

//             const handleDismissReport = (id) => {
//                 setReports(prevReports => prevReports.filter(report => report.id !== id));
//                 console.log(`Report ${id} dismissed.`);
//             };

//             return (
//                 <div className="dashboard-grid manage-section">
//                     <div className="dashboard-card">
//                         <h3 className="card-title">User Reports</h3>
//                         <div style={{ overflowX: 'auto' }}>
//                             <table className="data-table">
//                                 <thead>
//                                     <tr>
//                                         <th>Issue</th>
//                                         <th>Reported By</th>
//                                         <th>Reported User/Provider</th>
//                                         <th>Status</th>
//                                         <th>Date</th>
//                                         <th>Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {reports.length > 0 ? (
//                                         reports.map(report => (
//                                             <tr key={report.id}>
//                                                 <td>{report.issue}</td>
//                                                 <td>{report.reportedBy}</td>
//                                                 <td>{report.reportedUser}</td>
//                                                 <td>
//                                                     <span className={`status-badge ${report.status === 'Pending' ? 'pending' : 'resolved'}`}>
//                                                         {report.status}
//                                                     </span>
//                                                 </td>
//                                                 <td>{report.date}</td>
//                                                 <td>
//                                                     {report.status === 'Pending' && (
//                                                         <button className="action-button resolve" onClick={() => handleResolveReport(report.id)}>Resolve</button>
//                                                     )}
//                                                     <button className="action-button view" onClick={() => handleViewUser(users.find(u => u.name === report.reportedUser) || { name: report.reportedUser, email: 'N/A', role: 'N/A' })}>View User</button>
//                                                     <button className="action-button delete" onClick={() => handleDismissReport(report.id)}>Dismiss</button>
//                                                 </td>
//                                             </tr>
//                                         ))
//                                     ) : (
//                                         <tr>
//                                             <td colSpan="6" style={{ textAlign: 'center', padding: '1rem' }}>No active reports.</td>
//                                         </tr>
//                                     )}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             );
//         };


//         // --- Main AdminDashboard Component ---
//         const AdminDashboard = () => {
//             const [activeTab, setActiveTab] = useState('Home'); // Default tab
//             const [users, setUsers] = useState([]);
//             const [reports, setReports] = useState([]);
//             const [services, setServices] = useState([]);
//             const [categories, setCategories] = useState([]);
//             const [orders, setOrders] = useState([]); // New state for orders
//             const [loading, setLoading] = useState(true);

//             const [showModal, setShowModal] = useState(false);
//             const [modalContent, setModalContent] = useState(null);
//             const [modalType, setModalType] = useState('');

//             // Simulate fetching all data on component mount
//             useEffect(() => {
//                 setTimeout(() => {
//                     setUsers(initialUsers);
//                     setReports(initialReports);
//                     setServices(initialServices);
//                     setCategories(initialCategories);
//                     setOrders(initialOrders);
//                     setLoading(false);
//                 }, 1000); // Simulate API call delay
//             }, []);

//             const handleBlockToggle = (id) => {
//                 setUsers(prevUsers =>
//                     prevUsers.map(user =>
//                         user.id === id ? { ...user, status: user.status === 'Active' ? 'Blocked' : 'Active' } : user
//                     )
//                 );
//                 console.log(`User ${id} status toggled.`);
//             };

//             const handleDeleteUser = (id) => {
//                 if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
//                     setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
//                     console.log(`User ${id} deleted.`);
//                 }
//             };

//             const handleViewUser = (user) => {
//                 setModalContent(user);
//                 setModalType('view');
//                 setShowModal(true);
//             };

//             const handleEditUser = (user) => {
//                 setModalContent({ ...user }); // Create a copy for editing
//                 setModalType('edit');
//                 setShowModal(true);
//             };

//             const handleSaveUserEdit = (updatedUser) => {
//                 setUsers(prevUsers =>
//                     prevUsers.map(user =>
//                         user.id === updatedUser.id ? updatedUser : user
//                     )
//                 );
//                 setShowModal(false);
//                 console.log('User updated:', updatedUser);
//             };

//             if (loading) {
//                 return (
//                     <div className="admin-main" style={{ justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '1.5rem', color: 'var(--color-medium-slate)' }}>
//                         Loading Admin Dashboard...
//                     </div>
//                 );
//             }

//             return (
//                 <div className="app-container">
//                     {/* Dynamic Island Navbar */}
//                     <header className="dynamic-island-navbar">
//                         <div className="setu-logo-group">
//                             <svg className="setu-logo-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
//                             </svg>
//                             <div className="header-logo-text">Setu Admin</div>
//                         </div>
//                     </header>

//                     {/* Main Dashboard Content */}
//                     <main className="admin-main">
//                         <div className="dashboard-header">
//                             <h1 className="dashboard-title">Admin Panel</h1>
//                             <nav className="nav-tabs">
//                                 <button className={`nav-tab-button ${activeTab === 'Home' ? 'active' : ''}`} onClick={() => setActiveTab('Home')}>Home</button>
//                                 <button className={`nav-tab-button ${activeTab === 'Manage Users' ? 'active' : ''}`} onClick={() => setActiveTab('Manage Users')}>Manage Users</button>
//                                 <button className={`nav-tab-button ${activeTab === 'Manage Services' ? 'active' : ''}`} onClick={() => setActiveTab('Manage Services')}>Manage Services</button>
//                                 <button className={`nav-tab-button ${activeTab === 'Manage Categories' ? 'active' : ''}`} onClick={() => setActiveTab('Manage Categories')}>Manage Categories</button>
//                                 <button className={`nav-tab-button ${activeTab === 'Reports' ? 'active' : ''}`} onClick={() => setActiveTab('Reports')}>Reports</button>
//                             </nav>
//                         </div>

//                         <div className="dashboard-content">
//                             {activeTab === 'Home' && <HomeTab users={users} services={services} orders={orders} />}
//                             {activeTab === 'Manage Users' && (
//                                 <ManageUsersTab
//                                     users={users}
//                                     setUsers={setUsers}
//                                     handleViewUser={handleViewUser}
//                                     handleEditUser={handleEditUser}
//                                     handleBlockToggle={handleBlockToggle}
//                                     handleDeleteUser={handleDeleteUser}
//                                 />
//                             )}
//                             {activeTab === 'Manage Services' && <ManageServicesTab services={services} setServices={setServices} />}
//                             {activeTab === 'Manage Categories' && <ManageCategoriesTab categories={categories} setCategories={setCategories} />}
//                             {activeTab === 'Reports' && <ReportsTab reports={reports} setReports={setReports} users={users} handleViewUser={handleViewUser} />}
//                         </div>
//                     </main>

//                     {/* User Details View/Edit Modal (reused) */}
//                     {showModal && modalContent && (
//                         <div className="modal-backdrop" onClick={() => setShowModal(false)}>
//                             <div className="modal-content" onClick={e => e.stopPropagation()}>
//                                 <button className="modal-close-button" onClick={() => setShowModal(false)}>&times;</button>
//                                 <h3 className="modal-title">{modalType === 'view' ? 'User Details' : 'Edit User'}</h3>

//                                 {modalType === 'view' ? (
//                                     <div>
//                                         <p><strong>Name:</strong> {modalContent.name}</p>
//                                         <p><strong>Email:</strong> {modalContent.email}</p>
//                                         <p><strong>Role:</strong> {modalContent.role}</p>
//                                         <p><strong>Status:</strong> <span className={`status-badge ${modalContent.status === 'Active' ? 'active' : 'blocked'}`}>{modalContent.status}</span></p>
//                                         {modalContent.phone && <p><strong>Phone:</strong> {modalContent.phone}</p>}
//                                         {modalContent.dob && <p><strong>DOB:</strong> {modalContent.dob}</p>}
//                                         {modalContent.address && <p><strong>Address:</strong> {modalContent.address}</p>}
//                                         {modalContent.businessName && <p><strong>Business Name:</strong> {modalContent.businessName}</p>}
//                                         {modalContent.category && <p><strong>Category:</strong> {modalContent.category}</p>}
//                                         {modalContent.services && <p><strong>Services:</strong> {modalContent.services}</p>}
//                                         {modalContent.license && <p><strong>License:</strong> {modalContent.license}</p>}
//                                     </div>
//                                 ) : (
//                                     <form onSubmit={(e) => {
//                                         e.preventDefault();
//                                         handleSaveUserEdit(modalContent);
//                                     }}>
//                                         <div className="modal-form-group">
//                                             <label htmlFor="editName" className="modal-form-label">Name</label>
//                                             <input type="text" id="editName" className="modal-form-input" value={modalContent.name} onChange={(e) => setModalContent({ ...modalContent, name: e.target.value })} />
//                                         </div>
//                                         <div className="modal-form-group">
//                                             <label htmlFor="editEmail" className="modal-form-label">Email</label>
//                                             <input type="email" id="editEmail" className="modal-form-input" value={modalContent.email} onChange={(e) => setModalContent({ ...modalContent, email: e.target.value })} />
//                                         </div>
//                                         <div className="modal-form-group">
//                                             <label htmlFor="editStatus" className="modal-form-label">Status</label>
//                                             <select id="editStatus" className="modal-form-input" value={modalContent.status} onChange={(e) => setModalContent({ ...modalContent, status: e.target.value })}>
//                                                 <option value="Active">Active</option>
//                                                 <option value="Blocked">Blocked</option>
//                                             </select>
//                                         </div>
//                                         {/* Add more editable fields as needed for a comprehensive edit */}
//                                         <button type="submit" className="modal-save-button">Save Changes</button>
//                                     </form>
//                                 )}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             );
//         };

//         // Render the AdminDashboard component
//         ReactDOM.createRoot(document.getElementById('root')).render(<AdminDashboard />);
//     </script>
// </body>
// </html>
