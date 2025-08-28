import React, { useState, useEffect } from "react";

const UserDetailsPage = () => {
  // Initialize from localStorage or fallback defaults
  const userName = localStorage.getItem("userName") || "John Doe";
  const useremail = localStorage.getItem("email") || "abcd@xyz.com";

  const [fullName] = useState(userName); // disabled field, no setter needed
  const [email] = useState(useremail);   // disabled field, no setter needed

  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [flatHouseNo, setFlatHouseNo] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [street, setStreet] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [fullAddressDisplay, setFullAddressDisplay] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Update concatenated full address preview on dependencies change
  useEffect(() => {
    const parts = [
      flatHouseNo,
      roomNo ? `Room ${roomNo}` : "",
      street,
      area,
      city,
      state,
      zipCode,
    ].filter(Boolean);
    setFullAddressDisplay(parts.join(", "));
  }, [flatHouseNo, roomNo, street, area, city, state, zipCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !phoneNumber ||
      !dob ||
      !flatHouseNo ||
      !street ||
      !city ||
      !state ||
      !zipCode
    ) {
      setMessage("Please fill in all required fields (excluding Room No. if not applicable).");
      setMessageType("error");
      return;
    }

    // Phone number validation (10 digits)
    if (!/^\d{10}$/.test(phoneNumber)) {
      setMessage("Please enter a valid 10-digit phone number.");
      setMessageType("error");
      return;
    }

    // Age validation (at least 18)
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;

    if (age < 18) {
      setMessage("You must be at least 18 years old to register.");
      setMessageType("error");
      return;
    }

    // Zip code validation (6 digits)
    if (!/^\d{6}$/.test(zipCode)) {
      setMessage("Please enter a valid 6-digit Zip Code.");
      setMessageType("error");
      return;
    }

    try {
      setMessage("Saving your details...");
      setMessageType("");

      // Build request payload
      const requestBody = {
        fullName,
        email,
        phoneNumber,
        dob,
       
        address: [
      flatHouseNo,
      roomNo ? `Room ${roomNo}` : "",
      street,
      area,
      city,
      state,
      zipCode
    ].filter(Boolean).join(", "),
      };

      const response = await fetch("http://localhost:8080/api/auth/profile-completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // send cookies if backend uses JWT cookie auth
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User details saved successfully:", data);
        setMessage("Your details have been successfully saved!");
        setMessageType("success");

        // Redirect after a short delay to let user see success message
        setTimeout(() => {
          window.location.href = "/me";
        }, 1000);
      } else {
        const errorData = await response.json();
        const errMsg = errorData.message || "Failed to save user details.";
        setMessage(errMsg);
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error saving user details:", error);
      setMessage("An error occurred while saving your details. Please try again.");
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
          body { padding-top: 4rem; }
        }
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Poppins', sans-serif;
        }
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
            width: 90vw; padding: 0.2rem 2rem; border-radius: 3rem;
          }
        }
        @media (max-width: 480px) {
          .dynamic-island-navbar {
            width: 95vw; padding: 0.15rem 1.5rem; border-radius: 2.5rem;
          }
        }
        .setu-logo-icon {
          width: 32px; height: 32px; stroke-width: 2.5px; fill: none;
          color: var(--color-setu-blue); margin-right: 0.5rem;
        }
        @media (max-width: 480px) {
          .setu-logo-icon { width: 28px; height: 28px; }
        }
        .header-logo-text {
          font-size: 1.8rem; font-weight: 800; color: var(--color-setu-blue); letter-spacing: -0.02em;
        }
        @media (max-width: 480px) {
          .header-logo-text { font-size: 1.5rem; }
        }
        .user-details-main {
          flex-grow: 1;
          display: flex; flex-direction: column; justify-content: center; align-items: center;
          padding: 3rem 1.5rem; width: 100%; box-sizing: border-box;
        }
        .user-details-container {
          background-color: var(--color-pure-white);
          border-radius: 1rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          padding: 2.5rem;
          max-width: 500px;
          width: 100%;
          text-align: center;
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .user-details-title {
          font-size: 2rem; font-weight: 700; color: var(--color-deep-slate); margin-bottom: 1.5rem;
        }
        .user-details-subtitle {
          font-size: 1rem; color: var(--color-medium-slate); margin-bottom: 2rem;
        }
        .form-group { margin-bottom: 1.25rem; text-align: left; }
        .form-label {
          display: block; font-size: 0.95rem; font-weight: 500; color: var(--color-medium-slate); margin-bottom: 0.5rem;
        }
        .form-input {
          width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--color-light-grey);
          border-radius: 0.5rem; font-size: 1rem; color: var(--color-deep-slate);
          transition: border-color 0.2s, box-shadow 0.2s; box-sizing: border-box;
        }
        .form-input:focus {
          outline: none; border-color: var(--color-setu-blue); box-shadow: 0 0 0 3px rgba(10, 77, 170, 0.2);
        }
        .form-input:disabled { background-color: var(--color-cloud-grey); cursor: not-allowed; }
        .submit-button {
          width: 100%; padding: 0.9rem 1.5rem; background-color: var(--color-marigold-glow); color: var(--color-pure-white);
          font-size: 1.1rem; font-weight: 600; border: none; border-radius: 0.5rem; cursor: pointer;
          transition: all 0.3s; box-shadow: 0 4px 15px rgba(255, 175, 0, 0.2); margin-top: 1.5rem;
        }
        .submit-button:hover {
          background-color: #e69d00; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(255,175,0,0.4);
        }
        .submit-button:active {
          transform: translateY(0); box-shadow: 0 2px 5px rgba(255, 175, 0, 0.2);
        }
        .message-box {
          padding: 0.75rem 1rem; border-radius: 0.5rem; margin-bottom: 1rem; font-size: 0.9rem; font-weight: 500;
          text-align: center; opacity: 0; transform: translateY(-10px); transition: opacity 0.3s, transform 0.3s;
        }
        .message-box.show { opacity: 1; transform: translateY(0);}
        .message-box.error { background-color: #fce8e6; color: var(--color-alert-red); border: 1px solid var(--color-alert-red);}
        .message-box.success { background-color: #e6faed; color: var(--color-success-green); border: 1px solid var(--color-success-green);}
        .address-grid {
          display: grid; grid-template-columns: 1fr; gap: 1.25rem; margin-bottom: 1.25rem;
        }
        @media (min-width: 480px) {
          .address-grid.two-cols { grid-template-columns: repeat(2, 1fr);}
        }
        @media (min-width: 768px) {
          .address-grid.three-cols { grid-template-columns: repeat(3, 1fr);}
        }
        .address-grid .form-group { margin-bottom: 0; }
      `}</style>

      <div className="app-container">
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

        <main className="user-details-main">
          <div className="user-details-container">
            <h2 className="user-details-title">Complete Your Profile</h2>
            <p className="user-details-subtitle">
              Please provide the following details to get started.
            </p>
            {message && (
              <div
                className={`message-box ${messageType} ${
                  message ? "show" : ""
                }`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="form-input"
                  value={fullName}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  value={email}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  className="form-input"
                  placeholder="e.g., 9876543210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="dob" className="form-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  className="form-input"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </div>

              {/* Address Fields */}
              <h3
                className="form-label"
                style={{
                  marginTop: "2rem",
                  marginBottom: "1rem",
                  fontWeight: "600",
                  color: "var(--color-deep-slate)",
                }}
              >
                Address Details
              </h3>

              <div className="address-grid two-cols">
                <div className="form-group">
                  <label htmlFor="flatHouseNo" className="form-label">
                    Flat/House No.
                  </label>
                  <input
                    type="text"
                    id="flatHouseNo"
                    className="form-input"
                    placeholder="e.g., A-101"
                    value={flatHouseNo}
                    onChange={(e) => setFlatHouseNo(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="roomNo" className="form-label">
                    Room No. (Optional)
                  </label>
                  <input
                    type="text"
                    id="roomNo"
                    className="form-input"
                    placeholder="e.g., 12"
                    value={roomNo}
                    onChange={(e) => setRoomNo(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="street" className="form-label">
                  Street/Building Name
                </label>
                <input
                  type="text"
                  id="street"
                  className="form-input"
                  placeholder="e.g., Main Street, Royal Towers"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="area" className="form-label">
                  Area/Locality
                </label>
                <input
                  type="text"
                  id="area"
                  className="form-input"
                  placeholder="e.g., Downtown, Green Park"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  required
                />
              </div>

              <div className="address-grid two-cols">
                <div className="form-group">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="form-input"
                    placeholder="e.g., Mumbai"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    className="form-input"
                    placeholder="e.g., Maharashtra"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="address-grid three-cols">
                <div className="form-group">
                  <label htmlFor="zipCode" className="form-label">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    className="form-input"
                    placeholder="e.g., 400001"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    required
                  />
                </div>
                <div></div>
                <div></div>
              </div>

              <div className="form-group" style={{ marginTop: "1.5rem" }}>
                <label className="form-label">Full Address (Concatenated Preview)</label>
                <textarea
                  className="form-input"
                  rows={2}
                  value={fullAddressDisplay}
                  disabled
                  style={{
                    fontWeight: "bold",
                    color: "var(--color-setu-blue)",
                    minHeight: "auto",
                  }}
                ></textarea>
              </div>

              <button type="submit" className="submit-button">
                Save Details
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default UserDetailsPage;
