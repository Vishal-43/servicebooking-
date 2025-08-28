import React, { useState, useEffect } from "react";
import ReviewModal from "./userreviews";

const statusColors = {
  "Pending": "#FFAF00",
  "Accepted": "#0A4DAA",
  "Rejected": "#D32F2F",
  "Completed": "#28A745",
  "Cancelled": "#667085"
};



const UserOrdersTab = ({ userdata }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
   const [showReviewModal, setShowReviewModal] = useState(false);
   const [selectedOrder, setSelectedOrder] = useState(null);
   

  useEffect(() => {
    if (!userdata?.email) return;

    async function fetchOrders() {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8080/api/user/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userdata.email }),
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to load orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [userdata]);


   const openReview = (order) => {
    setSelectedOrder(order);
    setShowReviewModal(true);
  };

  const closeReview = () => {
    setShowReviewModal(false);
    setSelectedOrder(null);
  };

  // You may want to refresh orders after review submission in a real app!
  const handleReviewSubmit = async (reviewData) => {
    const res = await fetch("http://localhost:8080/api/user/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
      credentials: "include"
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || "Failed to submit review");
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders: {error}</p>;


  return (
    <div style={{width: "100%", maxWidth: 1200, margin: "0 auto", padding: 24}}>
      <h1 style={{textAlign: "center", marginBottom: 24}}>Your Orders</h1>
      <ReviewModal
        isOpen={showReviewModal}
        onClose={closeReview}
        onSubmit={handleReviewSubmit}
        order={selectedOrder}
      />
      {orders.length === 0 && <p>No orders found.</p>}
      <div style={{display: "flex", flexDirection: "column", gap: 16}}>
        {orders.map(order => (
          <div key={order.id} style={{
            borderRadius: 18,
            padding: 20,
            boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
            background: "white",
            display: "flex",
            flexDirection: "column"
          }}>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <h2 style={{margin:0}}>{order.service || "Service"}</h2>
              <span style={{
                backgroundColor: statusColors[order.status] || "#999",
                color: "white",
                padding: "4px 12px",
                borderRadius: 12,
                fontWeight: "600",
                fontSize: 14,
                textTransform: "uppercase"
              }}>
                {order.status}
              </span>
            </div>
            <p style={{margin: "8px 0"}}><strong>Payment Status:</strong> {order.paymentStatus || "Unknown"}</p>
            <p style={{margin: "8px 0"}}><strong>Date:</strong> {new Date(order.bookingdatetime).toLocaleDateString()}</p>
            <p style={{margin: "8px 0"}}><strong>Time:</strong> {order.bookingdatetime || "N/A"}</p>

            <p style={{margin: "8px 0", fontStyle: "italic"}}><strong>Notes:</strong> {((order.bookingdatetime).split("T")[1]).substring(0,5) || "None"}</p>
            {order.status === "Accepted" && !order.hasReview && (
              <button
                className="action-button"
                style={{marginTop: 12, maxWidth: 180}}
                onClick={() => openReview(order)}
              >
                Write Review
              </button>
            )}
            {order.hasReview && (
              <span style={{marginTop: 8, color: "#28A745", fontWeight: 600}}>Review submitted</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default UserOrdersTab;
