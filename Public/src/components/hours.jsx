import React, { useState, useEffect } from "react";
import "./hours.css";
import mockHours from "../mocks/hours.json";

const Hours = () => {
  const [hoursData, setHoursData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchHours = async () => {
      try {
        const useMockData = process.env.NODE_ENV === "development";
        let data;

        if (useMockData) {
          data = mockHours;
        } else {
          const response = await fetch("/api/hours");
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          data = await response.json();
        }

        const hoursDataObj = data.map((category) => ({
          ...category,
          completedPercentage: (category.hours / category.total) * 100,
        }));
        setHoursData(hoursDataObj);
      } catch (error) {
        setError(error);
        console.error("Error fetching hours:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHours();
  }, []);

  const openEventDetails = (event, categoryName) => {
    setSelectedEvent({ ...event, categoryName });
  };

  const closePopup = () => {
    setSelectedEvent(null);
  };

  if (loading) {
    return <div className="loading-message">Loading hours data...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  if (!hoursData) {
    return <div className="no-data-message">No hours data available.</div>;
  }

  const totalHoursAllocated = hoursData.reduce(
    (sum, category) => sum + category.hours,
    0
  );
  const totalHoursAvailable = hoursData.reduce(
    (sum, category) => sum + category.total,
    0
  );

  const allEvents = hoursData.flatMap((category) =>
    category.events.map((event) => ({
      ...event,
      categoryName: category.categoryName,
      hoursAllocated: event.hoursAllocated === event.totalHours,
    }))
  );

  return (
    <div className="hours-container">
      <div className="total-summary">
        <h2>
          Total Hours:{" "}
          <span className="total-hours">
            {totalHoursAllocated} / {totalHoursAvailable}
          </span>
        </h2>
      </div>

      <div className="categories-grid">
        {hoursData.map((category, index) => (
          <div key={index} className="category-card">
            <h3>{category.categoryName}</h3>
            <p>
              Completed: {category.hours} / {category.total}
            </p>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${category.completedPercentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="new-events-list">
  <h2 className="new-events-header">Events</h2>
  {allEvents.map((event, index) => (
    <div key={index} className="new-event-item">
      <label className="new-event-name">{event.name}</label>
      <button
        className="new-details-button"
        onClick={() => openEventDetails(event, event.categoryName)}
      >
        View Details
      </button>
    </div>
  ))}
</div>


      {selectedEvent && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-button" onClick={closePopup}>
              &times;
            </button>
            <h2>Event Details</h2>
            <p>
              <strong>Event Name:</strong> {selectedEvent.name}
            </p>
            <p>
              <strong>Category:</strong> {selectedEvent.categoryName}
            </p>
            <p>
              <strong>Hours Allocated:</strong>{" "}
              {selectedEvent.hoursAllocated ? "Yes" : "No"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hours;
