import React from "react";
const ReviewModal = ({ isOpen, onClose, onSubmit, order }) => {
  const [rating, setRating] = React.useState(5);
  const [comment, setComment] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setRating(5);
      setComment("");
    }
  }, [isOpen, order]);

  if (!isOpen || !order) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit({
        orderId: order.id,
        rating,
        comment
      });
      onClose();
      alert("Review submitted!");
    } catch (err) {
      alert("Failed to submit review: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} aria-modal="true" role="dialog">
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose} aria-label="Close review form">
          &times;
        </button>
        <h2 className="modal-title">Review Order: {order.serviceName}</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal-form-group">
            <label className="modal-form-label">Rating:</label>
            <select
              className="modal-form-input"
              value={rating}
              onChange={e => setRating(Number(e.target.value))}
              required
            >
              {[5,4,3,2,1].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <div className="modal-form-group">
            <label className="modal-form-label">Comment:</label>
            <textarea
              className="modal-form-input"
              rows={3}
              value={comment}
              onChange={e => setComment(e.target.value)}
              required
              placeholder="Write something about your experience"
            />
          </div>
          <button className="modal-save-button" type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;