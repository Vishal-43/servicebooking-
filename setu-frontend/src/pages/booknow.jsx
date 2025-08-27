import React, { useState, useEffect } from "react";

// Utility to convert file to base64
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const BookNowModal = ({ isOpen, onClose, service, onSubmit }) => {
  const [form, setForm] = useState({
    date: "",
    time: "",
    notes: "",
    images: [],         // store base64 strings
  });
  const [imagePreviews, setImagePreviews] = useState([]); // Store preview urls for UI
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm({
        date: "",
        time: "",
        notes: "",
        images: [],
      });
      setImagePreviews([]);
    }
  }, [isOpen, service]);

  if (!isOpen || !service) return null;

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const base64s = await Promise.all(files.map(toBase64));

    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...base64s],
    }));
    setImagePreviews((prev) => [...prev, ...base64s]);
  };

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit({
        ...form,
        // Optionally strip data:image/... prefix here if backend expects raw base64
      });
      onClose();
      alert("Booking request submitted successfully!");
    } catch (error) {
      alert("Failed to submit booking: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} aria-modal="true" role="dialog">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose} aria-label="Close booking form">
          &times;
        </button>
        <h2 className="modal-title">Book Service: {service.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal-form-group">
            <label className="modal-form-label">Date:</label>
            <input type="date" name="date" className="modal-form-input" value={form.date} onChange={handleChange} required />
          </div>
          <div className="modal-form-group">
            <label className="modal-form-label">Time:</label>
            <input type="time" name="time" className="modal-form-input" value={form.time} onChange={handleChange} required />
          </div>
          <div className="modal-form-group">
            <label className="modal-form-label">Notes (optional):</label>
            <textarea name="notes" className="modal-form-input" rows={3} value={form.notes} onChange={handleChange} />
          </div>
          <div className="modal-form-group">
            <label className="modal-form-label">Upload Images (optional):</label>
            <input type="file" accept="image/*" multiple onChange={handleFileChange} />
            <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
              {imagePreviews.map((src, idx) => (
                <div key={idx} style={{ position: "relative" }}>
                  <img src={src} alt={`Upload preview ${idx + 1}`} style={{ height: 60, borderRadius: 8, objectFit: "cover" }} />
                  <button 
                    type="button" 
                    onClick={() => removeImage(idx)} 
                    style={{ position: "absolute", top: -8, right: -8, background: "red", color: "white", borderRadius: "50%", border: "none", width: 20, height: 20, cursor: "pointer" }}
                    aria-label={`Remove image ${idx + 1}`}
                  >×</button>
                </div>
              ))}
            </div>
          </div>
          <button className="modal-save-button" type="submit" disabled={submitting} aria-busy={submitting}>
            {submitting ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookNowModal;
