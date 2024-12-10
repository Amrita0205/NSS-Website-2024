import React, { useState, useEffect } from 'react';
import './announcement.css';
import mockAnnouncements from '../mocks/announcements.json';

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const useMockData = process.env.NODE_ENV === 'development';
        let data;

        if (useMockData) {
          data = mockAnnouncements; 
        } else {
          const response = await fetch('/api/announcements');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          data = await response.json();
        }

        setAnnouncements(data);
      } catch (error) {
        setError(error);
        console.error('Error fetching announcements:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) {
    return <div className="loading">Loading announcements...</div>; 
  }

  if (error) {
    return <div className="error-message">Error: {error.message}</div>; 
  }

  if (announcements.length === 0) {
    return <div className="no-announcements">No announcements available.</div>; 
  }

  return (
    <div className="announcement-list">
      {announcements.map((announcement) => (
        <div key={announcement.id} className="announcement-item">
          <h3 className="announcement-title">{announcement.title}</h3>
          <p className="announcement-description">{announcement.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Announcement;
