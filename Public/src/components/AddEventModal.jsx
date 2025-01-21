import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './AddEventModal.css';

const AddEventModal = ({ isOpen, onClose, onAdd }) => {
  const [form, setForm] = useState({
    title: '',
    date: '',
    description: '',
  });

  useEffect(() => {
    if (!isOpen) {
      // Reset the form when the modal is closed
      setForm({
        title: '',
        date: '',
        description: '',
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.description) {
      alert('Please fill in all fields before submitting.');
      return;
    }

    try {
      // Send a POST request using axios
      const response = await axios.post('http://127.0.0.1:5000/api/v1/events', form);
      
      // Call the onAdd function to update the parent component
      onAdd(response.data);
      onClose();
    } catch (error) {
      console.error('There was an error submitting the event!', error);
      alert('Error submitting event. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Add Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              name="description"
              placeholder="Event Description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="4"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
