import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import your page components
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import RoleSelectionPage from "./pages/profile_selection";
import UserDetailsPage from "./pages/userdetailcompliton";
import ServiceProviderPage from "./pages/serviceproviderdetails";
import ServiceProviderDashboard from "./pages/service_provider";
import UserDashboard from "./pages/userhome";
import AdminDashboard from "./pages/admin";
// import MyServicesDashboard from "./pages/myservicestab";
// import OrdersTab  from "./pages/orders";
// import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/Profile";

function App() {
  // Example: user authentication status (replace with your actual auth state)
  const isAuthenticated = /* your login state here, e.g. from context or redux */ false;

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
       
        <Route path="/role-selection" element={<RoleSelectionPage />} />
        <Route path="/profile-completion" element={<UserDetailsPage />} />
        <Route path="/service-provider-details" element={<ServiceProviderPage />} />
        <Route path="/admin" element={<ServiceProviderPage />} />
        <Route path="/service-provider" element={<ServiceProviderDashboard />} />
        <Route path="/me" element={<UserDashboard />} />
        <Route path="/nimda" element={<AdminDashboard />} />

        {/* Protected Routes */}
        {/* <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/profile" 
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />} 
        /> */}

        {/* Catch All - Redirect unknown routes to home or 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
