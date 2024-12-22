import React, { useState, useEffect } from 'react';
import './AddEventModal.css';

const AddEventModal = ({ isOpen, onClose, onAdd }) => {
  const [form, setForm] = useState({
    title: '',
    date: '',
    venue: '',
    description: '',
  });

  useEffect(() => {
    if (!isOpen) {
      // Reset the form when the modal is closed
      setForm({
        title: '',
        date: '',
        venue: '',
        description: '',
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.venue || !form.description) {
      alert('Please fill in all fields before submitting.');
      return;
    }
    onAdd(form);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-heading">Add Event</h2>
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
          <input
            type="text"
            name="venue"
            placeholder="Venue"
            value={form.venue}
            onChange={handleChange}
            className="input-field"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="input-field"
            required
          />
          <div className="button-container">
            <button
              type="button"
              onClick={onClose}
              className="cancel-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
