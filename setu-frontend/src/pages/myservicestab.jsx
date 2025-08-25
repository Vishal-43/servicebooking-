import React, { useState, useEffect } from "react";



const stripBase64Prefix = (dataUrl) => {
  return dataUrl.replace(/^data:image\/[a-z]+;base64,/, "");
};

// Utility to convert files to base64
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

// Modal component (reuse your existing one)
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

const AddServiceModal = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    status: "Active",
    images: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files);
    const base64s = await Promise.all(files.map((file) => toBase64(file)));
    setForm((f) => ({ ...f, images: base64s }));
    setImagePreviews(base64s);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      name: "",
      category: "",
      description: "",
      price: "",
      status: "Active",
      images: [],
    });
    setImagePreviews([]);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="modal-title">Add Service</h2>
      <form onSubmit={handleSubmit}>
        <div className="modal-form-group">
          <label className="modal-form-label">Name:</label>
          <input
            className="modal-form-input"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="modal-form-group">
          <label className="modal-form-label">Category:</label>
          <input
            className="modal-form-input"
            name="category"
            value={form.category}
            onChange={handleChange}
          />
        </div>
        <div className="modal-form-group">
          <label className="modal-form-label">Description:</label>
          <textarea
            className="modal-form-input"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={2}
          />
        </div>
        <div className="modal-form-group">
          <label className="modal-form-label">Price:</label>
          <input
            className="modal-form-input"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="modal-form-group">
          <label className="modal-form-label">Photos:</label>
          <input
            className="modal-form-input"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFiles}
          />
          <div className="modal-image-preview-container">
            {imagePreviews.map((src, idx) => (
              <img
                src={src}
                key={idx}
                className="modal-image-preview"
                alt={`Preview ${idx}`}
              />
            ))}
          </div>
        </div>
        <button className="modal-save-button" type="submit">
          Add Service
        </button>
      </form>
    </Modal>
  );
};

const EditServiceModal = ({ isOpen, onClose, service, onSubmit }) => {
  const [form, setForm] = useState(service || {});
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    setForm(service || {});
    if (service?.imagesBase64) {
      const previews = service.imagesBase64.map(
        (img) => `data:image/png;base64,${img}`
      );
      setImagePreviews(previews);
    } else {
      setImagePreviews([]);
    }
  }, [service]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files);
    const base64s = await Promise.all(files.map((file) => toBase64(file)));
    setImagePreviews((prev) => [...prev, ...base64s]);
    setForm((f) => ({
      ...f,
      images: [...(f.images || []), ...base64s],
    }));
  };

  const removeImageAtIndex = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setForm((f) => ({
      ...f,
      images: f.images ? f.images.filter((_, i) => i !== index) : [],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const imagesWithoutPrefix = imagePreviews.map(stripBase64Prefix);
    onSubmit({ ...form, images: imagesWithoutPrefix });
    onClose();
  };

  if (!service) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="modal-title">Edit Service</h2>
      <form onSubmit={handleSubmit}>
        <div className="modal-form-group">
          <label className="modal-form-label">Name:</label>
          <input
            className="modal-form-input"
            name="name"
            value={form.name || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="modal-form-group">
          <label className="modal-form-label">Category:</label>
          <input
            className="modal-form-input"
            name="category"
            value={form.serviceCategory || ""}
            onChange={handleChange}
          />
        </div>
        <div className="modal-form-group">
          <label className="modal-form-label">Description:</label>
          <textarea
            className="modal-form-input"
            name="description"
            value={form.description || ""}
            onChange={handleChange}
            rows={2}
          />
        </div>
        <div className="modal-form-group">
          <label className="modal-form-label">Price:</label>
          <input
            className="modal-form-input"
            name="price"
            type="number"
            value={form.servicePrice || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="modal-form-group">
          <label className="modal-form-label">Photos:</label>
          <input
            className="modal-form-input"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFiles}
          />
          <div className="modal-image-preview-container">
            {imagePreviews.map((src, idx) => (
              <div
                key={idx}
                style={{ position: "relative", display: "inline-block" }}
              >
                <img
                  src={src}
                  className="modal-image-preview"
                  alt={`Preview ${idx}`}
                />
                <button
                  type="button"
                  onClick={() => removeImageAtIndex(idx)}
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    background: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "50%",
                    cursor: "pointer",
                    padding: "0 6px",
                    fontWeight: "bold",
                    lineHeight: "1",
                  }}
                  aria-label={`Remove image ${idx + 1}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        <button className="modal-save-button" type="submit">
          Save Changes
        </button>
      </form>
    </Modal>
  );
};

const MyServicesPage = ({ userdata }) => {
  console.log(userdata);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    async function fetchServices() {
      if (!userdata?.providerId) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          "http://localhost:8080/api/service-provider/services",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userdata),
            credentials: "include",
          }
        );
        if (!res.ok) throw new Error("Failed to load services");
        const data = await res.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, [userdata]);

  const handleAddService = async (form) => {
    try {
      const res = await fetch("http://localhost:8080/api/service-provider/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, ...userdata }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to add service");
      const newService = await res.json();
      setServices((prev) => [...prev, newService]);
      alert("Service added successfully");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditService = async (form) => {
    try {
      const res = await fetch("http://localhost:8080/api/service-provider/edit", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update service");
      const updatedService = await res.json();
      setServices((prev) =>
        prev.map((s) => (s.id === updatedService.id ? updatedService : s))
      );
      alert("Service updated successfully");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const service = services.find((s) => s.id === id);
      const newStatus = service.status === "Active" ? "Deactivated" : "Active";
      const res = await fetch("http://localhost:8080/api/service-provider/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update status");
      setServices((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
      );
      alert(`Service ${newStatus.toLowerCase()} successfully`);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch("http://localhost:8080/api/service-provider/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete service");
      setServices((prev) => prev.filter((s) => s.id !== id));
      alert("Service deleted successfully");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading services...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="dashboard-content">
      {/* Modals */}
      <AddServiceModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddService}
      />
      <EditServiceModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        service={editingService}
        onSubmit={handleEditService}
      />

      <div className="services-container">
        <div className="add-service-card" onClick={() => setShowAddModal(true)}>
          <div className="add-icon">+</div>
          <div className="add-text">Add New Service</div>
        </div>
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <div className="service-image-container">
              {service.imagesBase64 && service.imagesBase64.length > 0 ? (
                service.imagesBase64.map((img, i) => (
                  <img
                    key={i}
                    src={`data:image/png;base64,${img}`}
                    alt={`${service.name} ${i}`}
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
                {service.name}
                <span className={`status-badge ${service.status?.toLowerCase()}`}>
                  {service.status}
                </span>
              </h4>
              <h4>₹{service.servicePrice}/-</h4>
              <p>{service.description}</p>
            </div>
            <div className="service-card-actions">
              <button
                className="action-button edit"
                onClick={() => {
                  setEditingService(service);
                  setShowEditModal(true);
                }}
              >
                View/Edit
              </button>
              <button
                className="action-button delete"
                onClick={() => handleDeleteService(service.id)}
              >
                Delete
              </button>
              <button
                className="action-button deactivate"
                onClick={() => handleToggleStatus(service.id)}
              >
                {service.status === "Active" ? "Deactivate" : "Activate"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyServicesPage;
