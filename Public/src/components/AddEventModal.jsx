import React, { useState, useEffect } from 'react';

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add Event</h2>
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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
