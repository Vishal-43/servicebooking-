import React, { useState, useEffect } from "react";

const reportStatusColors = {
  Open: "#FFA000",
  Reviewed: "#0A4DAA",
  Resolved: "#28A745",
  Closed: "#667085"
};

const UserReportsTab = ({ userdata }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newReportTitle, setNewReportTitle] = useState("");
  const [newReportDescription, setNewReportDescription] = useState("");
  const [submittingReport, setSubmittingReport] = useState(false);

  useEffect(() => {
    if (!userdata?.email) return;

    async function fetchReports() {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8080/api/user/reports", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userdata.email }),
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to load reports");
        const data = await res.json();
        setReports(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
  }, [userdata]);

  const submitReport = async (e) => {
    e.preventDefault();
    setSubmittingReport(true);
    try {
      const res = await fetch("http://localhost:8080/api/user/reports/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userdata.email,
          
          report: newReportDescription,
        }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to submit report");
      const savedReport = await res.json();
      setReports((prev) => [savedReport, ...prev]);
      setNewReportTitle("");
      setNewReportDescription("");
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmittingReport(false);
    }
  };

  if (loading) return <p>Loading reports...</p>;
  if (error) return <p>Error loading reports: {error}</p>;

  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Your Reports</h1>

      <form onSubmit={submitReport} style={{ marginBottom: "2rem" }}>
        
        <div className="modal-form-group">
          <label className="modal-form-label" htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            value={newReportDescription}
            onChange={(e) => setNewReportDescription(e.target.value)}
            className="modal-form-input"
            rows={4}
            placeholder="Describe your issue or feedback"
          />
        </div>
        <button className="modal-save-button" type="submit" disabled={submittingReport}>
          {submittingReport ? "Submitting..." : "Submit Report"}
        </button>
      </form>

      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <div className="services-container" style={{ gap: "1.5rem" }}>
          {reports.map((report) => (
            <div key={report.id} className="service-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ margin: 0 }}>{report.content}</h3>
                <span
                  style={{
                    backgroundColor: reportStatusColors[report.status] || "#999",
                    color: "white",
                    padding: "0.3rem 1rem",
                    borderRadius: "1rem",
                    fontWeight: "600",
                    fontSize: "0.85rem",
                    textTransform: "uppercase"
                  }}
                >
                  {report.status}
                </span>
              </div>
              <p style={{ marginTop: "0.5rem" }}>{report.description}</p>
              <div style={{ fontSize: "0.85rem", color: "#667085", marginTop: "1rem" }}>
                <em>Submitted on {new Date(report.createdAt).toLocaleString()}</em>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserReportsTab;
