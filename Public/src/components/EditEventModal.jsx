import React, { useState, useEffect } from 'react';
import './EditEventModal.css'

const EditEventModal = ({ isOpen, onClose, event, onUpdate }) => {
  const [form, setForm] = useState({ title: '', date: '', venue: '', description: '' });

  // Sync form state with the event prop when it changes
  useEffect(() => {
    if (event) {
      setForm({ ...event });
    }
  }, [event]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form); // Update the event details
    onClose(); // Close the modal
  };

  return (
    <div className="edit-event-modal">
      <div className="modal-content">
        <h2 className="modal-title">Edit Event</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={form.title}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="input-field"
            required
          />
          {/* <input
            type="text"
            name="venue"
            placeholder="Venue"
            value={form.venue}
            onChange={handleChange}
            className="input-field"
            required
          /> */}
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="input-field"
            required
          />
          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;
