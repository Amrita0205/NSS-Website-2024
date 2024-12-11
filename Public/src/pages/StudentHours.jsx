import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const StudentHours = () => {
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [hours, setHours] = useState('');

  useEffect(() => {
    const fetchBatches = async () => {
      const response = await fetch('/api/batches');
      const data = await response.json();
      setBatches(data);
    };

    const fetchCategories = async () => {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    };

    const fetchEvents = async () => {
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data);
    };

    fetchBatches();
    fetchCategories();
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      if (selectedBatch) {
        const response = await fetch(`/api/students?batch=${selectedBatch}`);
        const data = await response.json();
        setStudents(data);
      }
    };

    fetchStudents();
  }, [selectedBatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      studentId: selectedStudent,
      categoryId: selectedCategory,
      eventId: selectedEvent,
      hours: hours,
    };

    await fetch('/api/submitHours', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    setSelectedStudent('');
    setSelectedCategory('');
    setSelectedEvent('');
    setHours('');
  };

  return (
    <div>
      <Navbar />
      <div className="bg-black text-white flex flex-col items-center justify-center h-28 mt-32">
        <h1 className="text-4xl font-bold mb-4 tracking-wide">Student's Hours</h1>
        {/* <p className="text-lg font-light opacity-80">Organize and manage events effortlessly.</p> */}
      </div>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-2xl my-8 border-2 border-gray-800">
        <h1 className="text-2xl font-semibold text-center mb-6">Add Student's Hours</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Select Batch:</label>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Batch</option>
              {batches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Select Student (Roll No.):</label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.rollNumber}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Select Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Category of Event</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Select Event:</label>
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Event</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Enter Hours:</label>
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              required
              min="0"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className='flex justify-center '>
          <button
            type="submit"
            className="w-[100px] py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default StudentHours;
