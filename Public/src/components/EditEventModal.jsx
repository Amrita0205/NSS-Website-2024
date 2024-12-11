import React, { useState, useEffect } from 'react';

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Event</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <input
            type="text"
            name="venue"
            placeholder="Venue"
            value={form.venue}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
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
