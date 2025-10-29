import React, { useState, useEffect } from "react";

// Utility to display star rating
const StarRating = ({ rating }) => {
  const fullStar = "★";
  const emptyStar = "☆";
  return (
    <span style={{ color: "#FFAF00", fontSize: "1.2rem" }}>
      {Array.from({ length: 5 }, (_, i) => (i < rating ? fullStar : emptyStar)).join(" ")}
    </span>
  );
};

const ReviewsSummary = ({ userdata }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true);
        const res = await fetch("/api/service-provider/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userdata),
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to load reviews");
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (userdata?.providerId) {
      fetchReviews();
    }
  }, [userdata]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="dashboard-content">
      <h3>Total Reviews: {reviews.length}</h3>
      <div className="services-container">
        {reviews.length === 0 ? (
          <p>No reviews found.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="service-card">
              <div className="service-card-content" style={{ padding: "1.2rem" }}>
                <StarRating rating={review.rating || 0} />
                <p style={{ fontStyle: "italic", fontSize: "1rem", marginTop: "0.4rem" }}>
                  "{review.comment || "-"}"
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsSummary;
