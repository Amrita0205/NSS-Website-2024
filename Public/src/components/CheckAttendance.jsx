import React, { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import './CheckAttendance.css';

const CheckAttendance = () => {
  const events = [
    { name: "Event 1" },
    { name: "Event 2" },
    { name: "Event 3" }
  ];

  const attendeesData = {
    "Event 1": [
      { name: "Student A", rollNo: "101", batch: "Batch 1" },
      { name: "Student B", rollNo: "102", batch: "Batch 2" }
    ],
    "Event 2": [
      { name: "Student C", rollNo: "201", batch: "Batch 3" },
      { name: "Student D", rollNo: "202", batch: "Batch 1" }
    ],
    "Event 3": [
      { name: "Student E", rollNo: "301", batch: "Batch 2" },
      { name: "Student F", rollNo: "302", batch: "Batch 3" }
    ]
  };

  const [selectedEvent, setSelectedEvent] = useState("");
  const [attendees, setAttendees] = useState([]);

  const handleEventChange = (event) => {
    const eventName = event.target.value;
    setSelectedEvent(eventName);
    setAttendees(attendeesData[eventName] || []);
  };

  return (
    <div className="check-attendance">
      <Navbar />
      <div className="header-section">
        <h1>Check Event Attendance</h1>
        <p>Find out who attended the event</p>
      </div>

      <div className="content-section">
        <div className="event-selector">
          <label htmlFor="event">Select an Event</label>
          <select id="event" value={selectedEvent} onChange={handleEventChange}>
            <option value="" disabled>Select event</option>
            {events.map((event, index) => (
              <option key={index} value={event.name}>
                {event.name}
              </option>
            ))}
          </select>
        </div>

        {selectedEvent && attendees.length === 0 && (
          <div className="no-attendees">No attendees for this event.</div>
        )}

        {selectedEvent && attendees.length > 0 && (
          <div className="attendees-table">
            <h2>Students Attended</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll No</th>
                  <th>Batch</th>
                </tr>
              </thead>
              <tbody>
                {attendees.map((student, index) => (
                  <tr key={index}>
                    <td>{student.name}</td>
                    <td>{student.rollNo}</td>
                    <td>{student.batch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CheckAttendance;