import React, { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

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
    <div>
      <Navbar />
      <div className="bg-black text-white flex flex-col items-center justify-center h-28 mt-32">
        <h1 className="text-4xl font-bold mb-4 tracking-wide">Check Event Attendance</h1>
        <p className="text-lg font-light opacity-80">Find out who attended the event</p>
      </div>

      <div className="flex flex-col items-center justify-center py-12">
        <div className="mb-8">
          <label
            htmlFor="event"
            className="block text-lg font-semibold mb-2 text-center bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Select an Event
          </label>
          <select
            id="event"
            value={selectedEvent}
            onChange={handleEventChange}
            className="bg-white text-black px-6 py-3 rounded-lg shadow-lg w-60 border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          >
            <option value="" disabled>Select event</option>
            {events.map((event, index) => (
              <option key={index} value={event.name}>
                {event.name}
              </option>
            ))}
          </select>
        </div>

        {selectedEvent && attendees.length === 0 && (
          <div className="text-center text-lg text-gray-700">No attendees for this event.</div>
        )}

        {selectedEvent && attendees.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto border-2 border-black">
            <h2 className="text-2xl font-semibold text-center mb-6">Students Attended</h2>
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-lg font-semibold text-gray-700 border-b-2 border-gray-800">Name</th>
                  <th className="px-6 py-3 text-left text-lg font-semibold text-gray-700 border-b-2 border-gray-800">Roll No</th>
                  <th className="px-6 py-3 text-left text-lg font-semibold text-gray-700 border-b-2 border-gray-800">Batch</th>
                </tr>
              </thead>
              <tbody>
                {attendees.map((student, index) => (
                  <tr key={index} className="border-t border-gray-800">
                    <td className="px-6 py-3 text-lg text-gray-800">{student.name}</td>
                    <td className="px-6 py-3 text-lg text-gray-600">{student.rollNo}</td>
                    <td className="px-6 py-3 text-lg text-gray-600">{student.batch}</td>
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
