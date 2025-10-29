import React, { useState, useEffect } from "react";

const ServiceProviderPage = () => {
  // Simulated autofetched data for the contact person (replace with real logic if needed)
  const contactName = localStorage.getItem("userName") || "John Doe";
  const email = localStorage.getItem("email") || "abcd@xyz.com";

  // Business & Service Details
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [servicesOffered, setServicesOffered] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [serviceArea, setServiceArea] = useState("");
  const [workingHours, setWorkingHours] = useState("");

  // Contact & Address
  const [contactPhoneNumber, setContactPhoneNumber] = useState("");
  const [flatHouseNo, setFlatHouseNo] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [street, setStreet] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [fullAddressDisplay, setFullAddressDisplay] = useState("");

  // Bank Details
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");

  // Dropdown and UX state
  const [serviceCategories, setServiceCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Fetch dummy categories (simulate API)
  useEffect(() => {
    setTimeout(() => {
      setServiceCategories([
        "Plumbing", "Electrical", "Carpentry", "HVAC", "Cleaning",
        "Gardening", "Pest Control", "IT Support"
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Concatenate preview address
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

  // ---- FORM SUBMIT LOGIC WITH API POST ----
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Required field validation
    if (
      !businessName || !selectedCategory || !servicesOffered ||
      !contactPhoneNumber || !flatHouseNo || !street ||
      !city || !state || !zipCode ||
      !bankName || !accountNumber || !ifscCode
    ) {
      setMessage("Please fill in all required fields.");
      setMessageType("error");
      return;
    }
    if (!/^\d{10}$/.test(contactPhoneNumber)) {
      setMessage("Please enter a valid 10-digit phone number.");
      setMessageType("error");
      return;
    }
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode)) {
      setMessage("Please enter a valid IFSC code (e.g., ABCD0123456).");
      setMessageType("error");
      return;
    }
    if (!/^\d{6}$/.test(zipCode)) {
      setMessage("Please enter a valid 6-digit Zip Code.");
      setMessageType("error");
      return;
    }

    setMessage("Saving your details...");
    setMessageType("");

    // Build request payload
    const providerData = {
      businessDetails: {
        businessName,
        businessType,
        selectedCategory,
        servicesOffered,
        websiteUrl,
        licenseNumber,
        serviceArea,
        workingHours
      },
      contactDetails: {
        contactName,
        email,
        contactPhoneNumber
      },
      addressDetails: {
        flatHouseNo,
        roomNo,
        street,
        area,
        city,
        state,
        zipCode,
        fullAddress: [
          flatHouseNo,
          roomNo ? `Room ${roomNo}` : "",
          street,
          area,
          city,
          state,
          zipCode
        ].filter(Boolean).join(", ")
      },
      bankDetails: {
        bankName,
        accountNumber,
        ifscCode
      },
      email // Include email for backend processing
    };

    try {
      const response = await fetch("/api/auth/provider-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Remove if not using cookies/JWT
        body: JSON.stringify(providerData),
      });
      if (response.ok) {
        setMessage("Your service provider profile has been successfully saved!");
        setMessageType("success");
        // Optionally redirect after success
        setTimeout(() => window.location.href = "/service-provider", 1500);
      } else {
        const data = await response.json();
        setMessage(data.message || "Failed to save details.");
        setMessageType("error");
      }
    } catch (error) {
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
        body { font-family: 'Inter', sans-serif; color: var(--color-deep-slate); background-color: var(--color-cloud-grey);
               margin: 0; min-height: 100vh; padding-top: 3.5rem;}
        @media (max-width: 400px) { body { padding-top: 4rem; } }
        h1, h2, h3, h4, h5, h6 { font-family: 'Poppins', sans-serif; }
        .dynamic-island-navbar {
          position: fixed; top: 1rem; left: 50%; transform: translateX(-50%);
          background-color: var(--color-pure-white); box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          border-radius: 4rem; padding: 0.25rem 3rem;
          display: flex; align-items: center; justify-content: center;
          z-index: 200; width: 80vw; max-width: 800px; height: auto;}
        @media (max-width:768px){.dynamic-island-navbar{width:90vw;padding:0.2rem 2rem;border-radius:3rem}}
        @media (max-width:480px){.dynamic-island-navbar{width:95vw;padding:0.15rem 1.5rem;border-radius:2.5rem}}
        .setu-logo-icon {width:32px;height:32px;stroke-width:2.5px;fill:none;color:var(--color-setu-blue);margin-right:0.5rem;}
        @media (max-width:480px){.setu-logo-icon{width:28px;height:28px;}}
        .header-logo-text {font-size:1.8rem;font-weight:800;color:var(--color-setu-blue);letter-spacing:-0.02em;}
        @media (max-width:480px){.header-logo-text{font-size:1.5rem;}}
        .service-provider-main { flex-grow: 1; display: flex; flex-direction: column; justify-content: center; align-items: center;
            padding: 3rem 1.5rem; width: 100%; box-sizing: border-box; }
        .service-provider-container { background-color: var(--color-pure-white); border-radius: 1rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1); padding: 2.5rem; max-width: 650px; width: 100%;
            text-align: center; animation: fadeIn 0.5s ease-out forwards;}
        @keyframes fadeIn { from{opacity:0;transform:translateY(20px);} to{opacity:1;transform:translateY(0);} }
        .service-provider-title { font-size: 2rem; font-weight: 700; color: var(--color-deep-slate); margin-bottom: 1.5rem; }
        .service-provider-subtitle { font-size: 1rem; color: var(--color-medium-slate); margin-bottom: 2rem; }
        .form-group { margin-bottom: 1.25rem; text-align: left; }
        .form-label { display: block; font-size: 0.95rem; font-weight: 500; color: var(--color-medium-slate); margin-bottom: 0.5rem; }
        .form-input { width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--color-light-grey); border-radius: 0.5rem; font-size: 1rem; color: var(--color-deep-slate);
          transition: border-color 0.2s, box-shadow 0.2s; box-sizing: border-box; background-color: var(--color-pure-white);}
        .form-input:focus { outline: none; border-color: var(--color-setu-blue); box-shadow: 0 0 0 3px rgba(10,77,170,0.2);}
        .form-input:disabled { background-color: var(--color-cloud-grey); cursor: not-allowed; }
        .submit-button { width: 100%; padding: 0.9rem 1.5rem; background-color: var(--color-marigold-glow); color: var(--color-pure-white);
          font-size: 1.1rem; font-weight: 600; border: none; border-radius: 0.5rem; cursor: pointer;
          transition: all 0.3s; box-shadow: 0 4px 15px rgba(255,175,0,0.2); margin-top: 1.5rem; }
        .submit-button:hover { background-color: #e69d00; transform: translateY(-2px); box-shadow:0 8px 20px rgba(255,175,0,0.4);}
        .submit-button:active { transform:translateY(0); box-shadow:0 2px 5px rgba(255,175,0,0.2);}
        .message-box { padding:0.75rem 1rem;border-radius:0.5rem;margin-bottom:1rem;font-size:0.9rem;font-weight:500;text-align:center;
          opacity:0;transform:translateY(-10px);transition:opacity 0.3s,transform 0.3s;}
        .message-box.show { opacity:1;transform:translateY(0);}
        .message-box.error { background-color:#fce8e6;color:var(--color-alert-red);border:1px solid var(--color-alert-red);}
        .message-box.success { background-color:#e6faed;color:var(--color-success-green);border:1px solid var(--color-success-green);}
        .address-grid {display:grid;grid-template-columns:1fr;gap:1.25rem;margin-bottom:1.25rem;}
        @media (min-width:480px){.address-grid.two-cols{grid-template-columns:repeat(2,1fr);}}
        @media (min-width:768px){.address-grid.three-cols{grid-template-columns:repeat(3,1fr);}}
        .address-grid .form-group{margin-bottom:0;}
      `}</style>

      <div className="app-container">
        {/* Dynamic Island Navbar */}
        <header className="dynamic-island-navbar">
          <div className="setu-logo-group" style={{ display: "flex", alignItems: "center" }}>
            <svg className="setu-logo-icon" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
            </svg>
            <div className="header-logo-text">Setu</div>
          </div>
        </header>

        <main className="service-provider-main">
          <div className="service-provider-container">
            <h2 className="service-provider-title">Service Provider Registration</h2>
            <p className="service-provider-subtitle">
              Tell us about your business and services.
            </p>
            {message && (
              <div className={`message-box ${messageType} ${message ? "show" : ""}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Business Details Section */}
              <h3 className="form-label" style={{ marginTop: '2rem', marginBottom: '1rem', fontWeight: '600', color: 'var(--color-deep-slate)' }}>Business Details</h3>
              <div className="form-group">
                <label htmlFor="businessName" className="form-label">Business / Company Name</label>
                <input type="text" id="businessName" className="form-input" placeholder="e.g., Acme Solutions" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="selectedCategory" className="form-label">Service Category</label>
                <select
                  id="selectedCategory"
                  className="form-input"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  disabled={loading}
                  required
                >
                  {loading && <option value="">Loading categories...</option>}
                  {!loading && <option value="">Select a category</option>}
                  {serviceCategories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="businessType" className="form-label">Business Type</label>
                <select id="businessType" className="form-input" value={businessType} onChange={(e) => setBusinessType(e.target.value)}>
                  <option value="">Select Business Type</option>
                  <option value="sole-proprietor">Sole Proprietor</option>
                  <option value="partnership">Partnership</option>
                  <option value="llc">Limited Liability Company (LLC)</option>
                  <option value="corporation">Corporation</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="servicesOffered" className="form-label">Services Offered</label>
                <input type="text" id="servicesOffered" className="form-input" placeholder="e.g., Plumbing, Carpentry, Electrical" value={servicesOffered} onChange={(e) => setServicesOffered(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="websiteUrl" className="form-label">Website URL (Optional)</label>
                <input type="url" id="websiteUrl" className="form-input" placeholder="e.g., https://www.your-business.com" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="licenseNumber" className="form-label">Business Registration / License No. (Optional)</label>
                <input type="text" id="licenseNumber" className="form-input" placeholder="e.g., LIC-123456789" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="serviceArea" className="form-label">Service Area</label>
                <select id="serviceArea" className="form-input" value={serviceArea} onChange={(e) => setServiceArea(e.target.value)}>
                  <option value="">Select Service Area</option>
                  <option value="local">Local (City/Region)</option>
                  <option value="national">National</option>
                  <option value="international">International</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="workingHours" className="form-label">Working Hours</label>
                <input type="text" id="workingHours" className="form-input" placeholder="e.g., Mon-Fri, 9am-5pm" value={workingHours} onChange={(e) => setWorkingHours(e.target.value)} />
              </div>

              {/* Contact Details Section */}
              <h3 className="form-label" style={{ marginTop: '2rem', marginBottom: '1rem', fontWeight: '600', color: 'var(--color-deep-slate)' }}>Contact & Location</h3>
              <div className="form-group">
                <label htmlFor="contactName" className="form-label">Contact Person Full Name</label>
                <input type="text" id="contactName" className="form-input" value={contactName} disabled />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Contact Email</label>
                <input type="email" id="email" className="form-input" value={email} disabled />
              </div>
              <div className="form-group">
                <label htmlFor="contactPhoneNumber" className="form-label">Contact Phone Number</label>
                <input type="tel" id="contactPhoneNumber" className="form-input" placeholder="e.g., 9876543210" value={contactPhoneNumber} onChange={(e) => setContactPhoneNumber(e.target.value)} required />
              </div>

              {/* Address Fields */}
              <div className="address-grid two-cols">
                <div className="form-group">
                  <label htmlFor="flatHouseNo" className="form-label">Flat/House No.</label>
                  <input type="text" id="flatHouseNo" className="form-input" placeholder="e.g., A-101" value={flatHouseNo} onChange={(e) => setFlatHouseNo(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="roomNo" className="form-label">Room No. (Optional)</label>
                  <input type="text" id="roomNo" className="form-input" placeholder="e.g., 12" value={roomNo} onChange={(e) => setRoomNo(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="street" className="form-label">Street/Building Name</label>
                <input type="text" id="street" className="form-input" placeholder="e.g., Main Street, Royal Towers" value={street} onChange={(e) => setStreet(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="area" className="form-label">Area/Locality</label>
                <input type="text" id="area" className="form-input" placeholder="e.g., Downtown, Green Park" value={area} onChange={(e) => setArea(e.target.value)} required />
              </div>
              <div className="address-grid two-cols">
                <div className="form-group">
                  <label htmlFor="city" className="form-label">City</label>
                  <input type="text" id="city" className="form-input" placeholder="e.g., Mumbai" value={city} onChange={(e) => setCity(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="state" className="form-label">State</label>
                  <input type="text" id="state" className="form-input" placeholder="e.g., Maharashtra" value={state} onChange={(e) => setState(e.target.value)} required />
                </div>
              </div>
              <div className="address-grid three-cols">
                <div className="form-group">
                  <label htmlFor="zipCode" className="form-label">Zip Code</label>
                  <input type="text" id="zipCode" className="form-input" placeholder="e.g., 400001" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />
                </div>
                <div></div>
                <div></div>
              </div>
              <div className="form-group" style={{ marginTop: "1.5rem" }}>
                <label className="form-label">Full Address (Concatenated Preview)</label>
                <textarea className="form-input" rows={2} value={fullAddressDisplay} disabled style={{ fontWeight: "bold", color: "var(--color-setu-blue)", minHeight: "auto" }}></textarea>
              </div>

              {/* Bank Details Section */}
              <h3 className="form-label" style={{ marginTop: '2rem', marginBottom: '1rem', fontWeight: '600', color: 'var(--color-deep-slate)' }}>Bank Details</h3>
              <div className="form-group">
                <label htmlFor="bankName" className="form-label">Bank Name</label>
                <input type="text" id="bankName" className="form-input" placeholder="e.g., HDFC Bank" value={bankName} onChange={(e) => setBankName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="accountNumber" className="form-label">Account Number</label>
                <input type="text" id="accountNumber" className="form-input" placeholder="e.g., 123456789012" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="ifscCode" className="form-label">IFSC Code</label>
                <input type="text" id="ifscCode" className="form-input" placeholder="e.g., HDFC0000123" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} required />
              </div>

              <button type="submit" className="submit-button">
                Register as Service Provider
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default ServiceProviderPage;
