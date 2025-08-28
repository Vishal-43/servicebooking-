import React, { useState } from 'react';
import { useEffect } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'error' or 'success'
  const [rememberMe, setRememberMe] = useState(false);
  // Check if user already logged in on mount
  

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("Please enter both email and password.");
      setMessageType("error");
      return;
    }

    try {
      setMessage("Logging in...");
      setMessageType("");
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // important to receive HttpOnly cookie
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful!");
        setMessageType("success");
        setUser({ email });
        localStorage.setItem('userId', data.userId); 
        localStorage.setItem('email', data.email);
        localStorage.setItem('userName', data.name); // Assuming userName is returned in the response
        if(data.type === "user"){
         window.location.href = "/me"; 
        return null; 
        }else if(data.type === "service_provider"){
          window.location.href = "/service-provider"; 
          return null;
        }else{
          window.location.href = "/role-selection"; 
        }
        
    
      } else {
        setMessage(data.message || "Login failed.");
        setMessageType("error");
      }

      
    

        
    
  

    } catch (error) {
      setMessage("Server error, please try again later.");
      setMessageType("error");
    }

    
  };
  

  return (
    <>
      <style>{`
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
        .login-container {
          font-family: 'Inter', sans-serif;
          background-color: var(--color-pure-white);
          border-radius: 1rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          padding: 2.5rem;
          max-width: 450px;
          width: 100%;
          text-align: center;
          margin: 3rem auto;
          box-sizing: border-box;
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .login-logo-group {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          color: var(--color-setu-blue);
        }
        .setu-logo-icon {
          width: 48px;
          height: 48px;
          stroke-width: 2.5px;
          fill: none;
          margin-right: 0.75rem;
          color: var(--color-setu-blue);
        }
        .login-logo-text {
          font-size: 2.5rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--color-setu-blue);
        }
        .login-title {
          font-family: 'Poppins', sans-serif;
          font-size: 1.875rem;
          font-weight: 700;
          color: var(--color-deep-slate);
          margin-bottom: 1.5rem;
        }
        .form-group {
          margin-bottom: 1.25rem;
          text-align: left;
        }
        .form-label {
          display: block;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--color-medium-slate);
          margin-bottom: 0.5rem;
        }
        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid var(--color-light-grey);
          border-radius: 0.5rem;
          font-size: 1rem;
          color: var(--color-deep-slate);
          transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
          box-sizing: border-box;
        }
        .form-input:focus {
          outline: none;
          border-color: var(--color-setu-blue);
          box-shadow: 0 0 0 3px rgba(10, 77, 170, 0.2);
        }
        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }
        .checkbox-group {
          display: flex;
          align-items: center;
          color: var(--color-medium-slate);
        }
        .checkbox-group input[type="checkbox"] {
          margin-right: 0.5rem;
          width: 1rem;
          height: 1rem;
          accent-color: var(--color-setu-blue);
          cursor: pointer;
        }
        .forgot-password-link {
          color: var(--color-setu-blue);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease-in-out;
          cursor: pointer;
        }
        .forgot-password-link:hover {
          color: var(--color-marigold-glow);
        }
        .login-button {
          width: 100%;
          padding: 0.9rem 1.5rem;
          background-color: var(--color-marigold-glow);
          color: var(--color-pure-white);
          font-size: 1.1rem;
          font-weight: 600;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
          box-shadow: 0 4px 15px rgba(255, 175, 0, 0.2);
        }
        .login-button:hover {
          background-color: #e69d00;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255, 175, 0, 0.4);
        }
        .login-button:active {
          transform: translateY(0);
          box-shadow: 0 2px 5px rgba(255, 175, 0, 0.2);
        }
        .signup-text {
          margin-top: 1.5rem;
          color: var(--color-medium-slate);
          font-size: 0.95rem;
        }
        .signup-link {
          color: var(--color-setu-blue);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s ease-in-out;
          cursor: pointer;
        }
        .signup-link:hover {
          color: var(--color-marigold-glow);
        }
        .message-box {
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          font-weight: 500;
          text-align: center;
          opacity: 0;
          transform: translateY(-10px);
          transition: opacity 0.3s ease-out, transform 0.3s ease-out;
        }
        .message-box.show {
          opacity: 1;
          transform: translateY(0);
        }
        .message-box.error {
          background-color: #fce8e6;
          color: var(--color-alert-red);
          border: 1px solid var(--color-alert-red);
        }
        .message-box.success {
          background-color: #e6faed;
          color: var(--color-success-green);
          border: 1px solid var(--color-success-green);
        }
      `}</style>

      <div className="login-container" role="main" aria-labelledby="loginTitle">
        <div className="login-logo-group">
          <svg
            className="setu-logo-icon"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
          </svg>
          <div className="login-logo-text">Setu</div>
        </div>
        <h2 className="login-title" id="loginTitle">Welcome Back!</h2>

        {message && (
          <div className={`message-box ${messageType} show`} role="alert" aria-live="assertive">
            {message}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <div className="form-options">
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <a href="#" className="forgot-password-link" tabIndex={0}>Forgot Password?</a>
          </div>
          <button type="submit" className="login-button">Log In</button>
        </form>
        <p className="signup-text">
          Don't have an account? <a href="/signup" className="signup-link" tabIndex={0}>Sign Up</a>
        </p>
      </div>
    </>
  );
};

export default LoginPage;
