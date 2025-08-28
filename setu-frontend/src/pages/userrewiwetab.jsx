import React, { useState, useEffect } from "react";

const ratingColors = ["#D32F2F", "#FFA000", "#FFD600", "#388E3C", "#2E7D32"];

const UserReviewsTab = ({ userdata }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    if (!userdata?.email) return;

    async function fetchReviews() {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8080/api/user/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userdata.email }),
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to load reviews");
        const data = await res.json();
        const reviewsArray = Array.isArray(data) ? data : data.reviews || [];

        setReviews(reviewsArray);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [userdata]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error loading reviews: {error}</p>;

  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Your Reviews</h1>
      {reviews.length === 0 && <p>No reviews found.</p>}
      <div className="services-container" style={{gap: 20}}>
        {reviews.map((review, idx) => (
          <div key={review.id || idx} className="service-card" style={{minWidth: 320}}>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <div>
                <h4 style={{margin: 0, fontWeight: 700}}>{review.serviceName || "Service"}</h4>
               
              </div>
              <span
                style={{
                  background: ratingColors[(Math.round(review.rating || 5) - 1)],
                  color: "white",
                  padding: "6px 15px",
                  borderRadius: "1em",
                  fontWeight: "700",
                  fontSize: "1.1rem"
                }}
                title={`Rating: ${review.rating}`}
              >
                {review.rating} ★
              </span>
            </div>
            <p style={{marginTop: 12, marginBottom: 8, fontStyle: "italic", color: "#555"}}>
              "{review.comment || "No comment"}"
            </p>
            <div style={{fontSize: "0.93em", color: "#888"}}>Reviewed on {review.reviewDate ? new Date(review.reviewDate).toLocaleDateString() : "-"}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReviewsTab;
