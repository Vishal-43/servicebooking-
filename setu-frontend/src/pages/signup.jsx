import React, { useState } from 'react';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleSignup = async (e) => {
  e.preventDefault();

  // Basic validation (you can keep your existing)
  if (!fullName || !email || !password || !confirmPassword) {
    setMessage('All fields are required.');
    setMessageType('error');
    return;
  }

  if (password.length < 6) {
    setMessage('Password must be at least 6 characters long.');
    setMessageType('error');
    return;
  }

  if (password !== confirmPassword) {
    setMessage('Passwords do not match.');
    setMessageType('error');
    return;
  }

  try {
    setMessage('Signing up...');
    setMessageType('');

    // Call your backend API
    const response = await fetch('http://localhost:8080/api/auth/signup' 
, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullName, email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setMessage('Account created successfully! Redirecting to login...');
      setMessageType('success');

      // Optionally, redirect after a short delay
      setTimeout(() => {
        // e.g. if you use react-router-dom
        // navigate('/login');
        // or fallback:
        window.location.href = '/login';
      }, 1500);
    } else {
      // Handle errors returned by backend
      const err = await response.json();
      setMessage(err.message || 'Failed to create account. Please try again.');
      setMessageType('error');
    }
  } catch (error) {
    console.error('Signup error:', error);
    setMessage('Server error occurred. Please try again later.');
    setMessageType('error');
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
        body {
          font-family: 'Inter', sans-serif;
          color: var(--color-deep-slate);
          background-color: var(--color-cloud-grey);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          margin: 0;
          overflow-x: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 2rem 1rem;
          box-sizing: border-box;
        }
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Poppins', sans-serif;
        }
        .signup-container {
          background-color: var(--color-pure-white);
          border-radius: 1rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          padding: 2.5rem;
          max-width: 450px;
          width: 100%;
          text-align: center;
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .signup-logo-group {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
        }
        .setu-logo-icon {
          width: 48px;
          height: 48px;
          stroke-width: 2.5px;
          fill: none;
          color: var(--color-setu-blue);
          margin-right: 0.75rem;
        }
        .signup-logo-text {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--color-setu-blue);
          letter-spacing: -0.03em;
        }
        .signup-title {
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
        .signup-button {
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
        .signup-button:hover {
          background-color: #e69d00;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255, 175, 0, 0.4);
        }
        .signup-button:active {
          transform: translateY(0);
          box-shadow: 0 2px 5px rgba(255, 175, 0, 0.2);
        }
        .login-text {
          margin-top: 1.5rem;
          color: var(--color-medium-slate);
          font-size: 0.95rem;
        }
        .login-link {
          color: var(--color-setu-blue);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s ease-in-out;
          cursor: pointer;
        }
        .login-link:hover {
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
      <div className="signup-container" role="main" aria-labelledby="signupTitle">
        <div className="signup-logo-group">
          <svg
            className="setu-logo-icon"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            aria-hidden="true"
            focusable="false"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <div className="signup-logo-text">Setu</div>
        </div>
        <h2 className="signup-title" id="signupTitle">Create Your Account</h2>

        {message && (
          <div className={`message-box ${messageType} show`} role="alert" aria-live="assertive">
            {message}
          </div>
        )}

        <form onSubmit={handleSignup} noValidate>
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">Full Name</label>
            <input
              type="text"
              id="fullName"
              className="form-input"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-input"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>

        <p className="login-text">
          Already have an account?{' '}
          <a href="/login" className="login-link">
            Log In
          </a>
        </p>
      </div>
    </>
  );
};

export default Signup;
