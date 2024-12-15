import React, { useState, useEffect, useRef } from 'react';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import './StudentHours.css'; // Importing the external CSS file

const StudentHours = () => {
  const [students, setStudents] = useState([
    { rollNumber: '1' },
    { rollNumber: '2' },
    { rollNumber: '3' },
    { rollNumber: '4' },
  ]);
  const [batches, setBatches] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    setBatches([
      { name: 'Batch 2024' },
      { name: 'Batch 2023' },
      { name: 'Batch 2022' },
      { name: 'Batch 2021' },
    ]);

    setEvents([
      { name: 'Event A' },
      { name: 'Event B' },
    ]);

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Submission successful");
    const data = {
      event: selectedEvent,
      batch: selectedBatch,
      studentRollNumbers: selectedStudents,
    };

    console.log('Selected Data:', data);

    setSelectedStudents([]);
    setSelectedBatch('');
    setSelectedEvent('');
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleStudentSelection = (rollNumber) => {
    setSelectedStudents((prev) => {
      if (prev.includes(rollNumber)) {
        return prev.filter(roll => roll !== rollNumber);
      }
      return [...prev, rollNumber];
    });
  };

  return (
    <div>
      <Navbar />
      <div className="student-hours__header">
        <h1 className="student-hours__header-h1">Student's Hours</h1>
      </div>
      <div className="student-hours__form-container">
        <h1 className="student-hours__form-title">Add Student's Hours</h1>
        <form onSubmit={handleSubmit}>
          <div className="student-hours__form-group">
            <label className="student-hours__form-label">Select Event:</label>
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              required
              className="student-hours__form-select"
            >
              <option value="">Click to select Event</option>
              {events.map((event) => (
                <option key={event.name} value={event.name}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>

          <div className="student-hours__form-group">
            <label className="student-hours__form-label">Select Batch:</label>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              required
              className="student-hours__form-select"
            >
              <option value="">Click to select Batch</option>
              {batches.map((batch) => (
                <option key={batch.name} value={batch.name}>
                  {batch.name}
                </option>
              ))}
            </select>
          </div>

          <div className="student-hours__form-group">
            <label className="student-hours__form-label">Select Students (Roll No.):</label>

            <div className="student-hours__dropdown-container" ref={dropdownRef}>
              <input
                type="text"
                placeholder="Click to select students"
                onClick={toggleDropdown}
                value={selectedStudents.join(', ')}
                readOnly
                className="student-hours__dropdown-input"
              />
              {isDropdownVisible && (
                <ul className="student-hours__dropdown-menu">
                  {students.map((student) => (
                    <li
                      key={student.rollNumber}
                      onClick={() => handleStudentSelection(student.rollNumber)}
                      className={`student-hours__dropdown-item ${selectedStudents.includes(student.rollNumber) ? 'student-hours__dropdown-item--selected' : ''}`}
                    >
                      {student.rollNumber}
                    </li>
                  ))}
                </ul>
              )}
            </div> 
          </div>

          <div className="student-hours__submit-container">
            <button
              type="submit"
              className="student-hours__submit-button"
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
