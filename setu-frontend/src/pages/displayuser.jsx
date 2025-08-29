import React, { useState, useEffect } from "react";

const AdminUsersProvidersTable = ({ userdata, users, providers }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [combined, setCombined] = useState([]);

  
  useEffect(() => {
    // Combine users and providers with a type flag
    const combinedList = [
      ...users.map(u => ({ ...u })),
      ...providers.map(p => ({ ...p }))
    ];
    setCombined(combinedList);
  }, [users, providers]);

  // Filter combined list based on searchTerm (case-insensitive match on name or email)
  const filtered = combined.filter(item =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ background: "#f9fafb", padding: "1rem", borderRadius: "0.8rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)"}}>
      <h3>Users and Service Providers</h3>
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginBottom: "1rem",
          padding: "8px",
          width: "100%",
          boxSizing: "border-box",
          borderRadius: "0.4rem",
          border: "1px solid #ccc",
          fontSize: "1rem"
        }}
      />
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px", textAlign: "left" }}>Name</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px", textAlign: "left" }}>Email</th>
            
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px", textAlign: "left" }}>Type</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ padding: "8px", textAlign: "center" }}>No results found.</td>
            </tr>
          ) : (
            filtered.map((item) => (
                <tr key={item.id}>
                  <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{item.name}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{item.email || "—"}</td>
                  
                  <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{item.type}</td>
                </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersProvidersTable;
