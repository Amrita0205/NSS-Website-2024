import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./CheckAttendance.css";

const CheckAttendance = () => {
  const [events, setEvents] = useState([]); // Store events fetched from the API
  const [selectedEvent, setSelectedEvent] = useState("");
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(false); // Handle loading state
  const [error, setError] = useState(""); // Handle errors

  // Fetch events when the component loads
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/v1/event/all");
        const data = await response.json();
        setEvents(data.events || []);
      } catch (err) {
        setError("Failed to fetch events.");
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  // Handle event selection and fetch attendance data
  const handleEventChange = async (event) => {
    const eventId = event.target.value;
    setSelectedEvent(eventId);
    setAttendees([]); // Reset attendees
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/v1/student_participation/event/${eventId}`
      );
      const data = await response.json();
      const participations = data.participations || [];
      setAttendees(
        participations.map((p) => ({
          id: p.student_id,
          hours: p.hours,
          date: p.created_at,
        }))
      );
    } catch (err) {
      setError("Failed to fetch attendees.");
      console.error(err);
    } finally {
      setLoading(false);
    }
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
          <select
            id="event"
            value={selectedEvent}
            onChange={handleEventChange}
          >
            <option value="" disabled>
              Select event
            </option>
            {events.map((event) => (
              <option key={event._id} value={event._id}>
                {event.event_name}
              </option>
            ))}
          </select>
        </div>

        {loading && <div className="loading">Loading attendees...</div>}

        {error && <div className="error">{error}</div>}

        {selectedEvent && attendees.length === 0 && !loading && (
          <div className="no-attendees">No attendees for this event.</div>
        )}

        {selectedEvent && attendees.length > 0 && (
          <div className="attendees-table">
            <h2>Students Attended</h2>
            <table>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Hours</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {attendees.map((attendee, index) => (
                  <tr key={index}>
                    <td>{attendee.id}</td>
                    <td>{attendee.hours}</td>
                    <td>{new Date(attendee.date).toLocaleString()}</td>
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
