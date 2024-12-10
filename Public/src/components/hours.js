import React, { useState, useEffect } from 'react';
import './hours.css'; 
import mockHours from '../mocks/hours.json';

const Hours = () => {
  const [hoursData, setHoursData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHours = async () => {
      try {
        const useMockData = process.env.NODE_ENV === 'development'; 
        let data;

        if (useMockData) {
          data = mockHours; 
        } else {
          const response = await fetch('/api/hours'); 
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
        console.error('Error fetching hours:', error);

      } finally {
        setLoading(false);
      }
    };

    fetchHours();
  }, []);

  if (loading) {
    return <div className="loading-message">Loading hours data...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  if (!hoursData) {
    return <div className="no-data-message">No hours data available.</div>;
  }

  const totalHoursAllocated = hoursData.reduce((sum, category) => sum + category.hours, 0);
  const totalHoursAvailable = hoursData.reduce((sum, category) => sum + category.total, 0);

  return (
    <div className="hours-container">
      <div className="total-summary">
        <h2>
          Total Hours: <span className="total-hours">{totalHoursAllocated} / {totalHoursAvailable}</span>
        </h2>
      </div>

      <div className="categories-grid">
        {hoursData.map((category, index) => (
          <div key={index} className="category-card">
            <h3>{category.categoryName}</h3>
            <p>Completed: {category.hours} / {category.total}</p>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${category.completedPercentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="events-list">
        <h2>Events</h2>
        {hoursData.map((category, index) => (
          <div key={index} className="category-events">
            <h3>{category.categoryName}</h3>
            {category.events.map((event, eventIndex) => (
              <div key={eventIndex} className="event-item">
                <input
                  type="checkbox"
                  checked={event.hoursAllocated === event.totalHours}
                  readOnly
                />
                <label>{event.name}</label>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hours;
