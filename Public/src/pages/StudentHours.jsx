import React, { useState, useEffect, useRef } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

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
    alert("Submission successful");
    e.preventDefault();
    
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
      <div className="bg-black text-white flex flex-col items-center justify-center h-28 mt-32">
        <h1 className="text-4xl font-bold mb-4 tracking-wide">Student's Hours</h1>
      </div>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-2xl my-8 border-2 border-gray-800">
        <h1 className="text-2xl font-semibold text-center mb-6">Add Student's Hours</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Select Event:</label>
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Click to select Event</option>
              {events.map((event) => (
                <option key={event.name} value={event.name}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Select Batch:</label>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Click to select Batch</option>
              {batches.map((batch) => (
                <option key={batch.name} value={batch.name}>
                  {batch.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Select Students (Roll No.):</label>
            <div className="relative" ref={dropdownRef}>
              <input
                type="text"
                placeholder="Click to select students"
                onClick={toggleDropdown}
                value={selectedStudents.join(', ')}
                readOnly
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-black"
              />
              {isDropdownVisible && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 shadow-lg max-h-40 overflow-y-auto">
                  {students.map((student) => (
                    <li
                      key={student.rollNumber}
                      onClick={() => handleStudentSelection(student.rollNumber)}
                      className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${selectedStudents.includes(student.rollNumber) ? 'bg-blue-200' : ''}`}
                    >
                      {student.rollNumber}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className='flex justify-center'>
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
