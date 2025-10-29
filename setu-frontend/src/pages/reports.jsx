import React, { useState, useEffect } from "react";

const statusColors = {
  Open: "#FFAF00",
  Reviewed: "#0A4DAA",
  Resolved: "#28A745"
};

const ReportsTab = ({ userdata }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newReport, setNewReport] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchReports() {
      try {
        setLoading(true);
        const res = await fetch("/api/service-provider/reports", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userdata),
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
    if (userdata?.providerId) {
      fetchReports();
    }
  }, [userdata]);

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    if (!newReport.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/service-provider/reports/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userdata, report: newReport }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to submit report");
      const addedReport = await res.json();
      setReports((prev) => [addedReport, ...prev]);
      setNewReport("");
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading reports...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="dashboard-content">
      <h3>Submit a Report</h3>
      <form onSubmit={handleSubmitReport} style={{ marginBottom: "1.5rem" }}>
        <textarea
          value={newReport}
          onChange={e => setNewReport(e.target.value)}
          rows={3}
          placeholder="Describe your issue or feedback..."
          style={{
            width: "100%",
            padding: "1rem",
            borderRadius: "0.6rem",
            border: "1px solid #E0E0E0",
            fontSize: "1rem"
          }}
        />
        <br />
        <button
          type="submit"
          className="modal-save-button"
          disabled={submitting || !newReport.trim()}
          style={{ marginTop: "0.8rem" }}
        >
          {submitting ? "Submitting..." : "Submit Report"}
        </button>
      </form>

      <h3>Your Previous Reports</h3>
      <div className="services-container">
        {reports.length === 0 ? (
          <p>No previous reports found.</p>
        ) : (
          reports.map(report => (
            <div key={report.id} className="service-card">
              <div className="service-card-content" style={{ padding: "1.2rem" }}>
                <p style={{ fontStyle: "italic", fontSize: "1rem" }}>
                  "{report.content || report.report || "-"}"
                </p>
                <div style={{margin: "0.5rem 0"}}>
                  <span style={{
                    background: statusColors[report.status] || "#667085",
                    color: "#fff",
                    padding: "0.2em 0.85em",
                    borderRadius: "0.8em",
                    fontSize: "0.9em",
                    fontWeight: 600
                  }}>
                    {report.status}
                  </span>
                </div>
                <p style={{ fontSize: "0.82rem", color: "#667085" }}>
                  Submitted: {report.createdAt ? new Date(report.createdAt).toLocaleString() : "-"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReportsTab;
