import React, { useState, useEffect } from 'react';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import './StudentHours.css'; // Importing the external CSS file

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
      <div className="student-hours-header">
        <h1 className="student-hours-header-h1">Student's Hours</h1>
      </div>
      <div className="form-container">
        <h1 className="text-2xl font-semibold text-center mb-6 add-student-header">Add Student's Hours</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Select Batch:</label>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              required
              className="form-select"
            >
              <option value="">Select Batch</option>
              {batches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Select Student (Roll No.):</label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              required
              className="form-select"
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.rollNumber}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Select Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
              className="form-select"
            >
              <option value="">Select Category of Event</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Select Event:</label>
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              required
              className="form-select"
            >
              <option value="">Select Event</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Enter Hours:</label>
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              required
              min="0"
              className="form-input"
            />
          </div>
          <div className='flex justify-center '>
            <button
              type="submit"
              className="submit-btn"
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
