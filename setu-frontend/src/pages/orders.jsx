import React, { useState, useEffect } from "react";

// Status and payment dropdown options
const statusOptions = ["Pending", "Accepted", "Rejected"];
const paymentOptions = ["Unpaid", "Paid"];

const OrdersTab = ({ userdata }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8080/api/service-provider/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userdata),
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
    if (userdata?.providerId) {
      fetchOrders();
    }
  }, [userdata]);

  // Change order status
  const handleStatusChange = async (orderId, status) => {
    try {
      const res = await fetch(`http://localhost:8080/api/service-provider/orders/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, status }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update status");
      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  // Change payment status
  const handlePaymentChange = async (orderId, paymentStatus) => {
    try {
      const res = await fetch(`http://localhost:8080/api/service-provider/orders/payment-status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, paymentStatus }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update payment status");
      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, paymentStatus } : order
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="dashboard-content">
      <div className="services-container">
        {orders.length === 0 && <p>No orders found.</p>}

        {orders.map(order => (
          <div key={order.id} className="service-card">
            <div className="service-image-container">
              {order.imagesBase64 && order.imagesBase64.length > 0 ? (
                order.imagesBase64.map((img, i) => (
                  <img
                    key={i}
                    src={`data:image/png;base64,${img}`}
                    alt={`Order: ${i}`}
                    className="service-card-image"
                  />
                ))
              ) : (
                <img
                  src="https://placehold.co/400x250/667085/FFFFFF?text=No+Image"
                  className="service-card-image"
                  alt="No"
                />
              )}
            </div>
            <div className="service-card-content">
              <h4>
                {order.bookingDetails}
                <span className={`status-badge ${order.status?.toLowerCase()}`}>{order.status}</span>
              </h4>
              <h5 style={{ margin: "0.3rem" }} >{`service: ${order.service}` || "-"}</h5>
              <p>
                <b>Customer:</b> {order.customerName} <br />
                <b>Email:</b> {order.customerEmail} <br />
                <b>Date:</b> {order.bookingdatetime ? new Date(order.bookingdatetime).toLocaleString() : "-"} <br />
                <b>Notes:</b> {order.notes || "-"}
              </p>
              <div style={{ marginTop: "0.3rem" }}>
                <b>Payment:</b>{" "}
                <span
                  style={{
                    background: order.paymentStatus === "Paid" ? "#28A745" : "#D32F2F",
                    color: "#fff",
                    borderRadius: "0.5em",
                    padding: "2px 10px",
                    marginLeft: "6px"
                  }}
                >
                  {order.paymentStatus}

                  
                </span>
                <hr />
              </div>
            </div>
            <div className="service-card-actions">
              
              <select
                value={order.status}
                onChange={e => handleStatusChange(order.id, e.target.value)}
                className="action-button edit"
                style={{ minWidth: 90 }}
              >
                {statusOptions.map(option => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <select
                value={order.paymentStatus}
                onChange={e => handlePaymentChange(order.id, e.target.value)}
                className="action-button deactivate"
                style={{ minWidth: 90 }}
              >
                {paymentOptions.map(option => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersTab;

