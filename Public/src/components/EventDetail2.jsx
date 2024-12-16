import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import '../views/Event.css';

// Import images
// import campusImage from './assets/IIIT.JPG';
// import eventImage from '/images/DSC09569.JPG';

function EventDetail2() {
  return (
    <>
    <Navbar/>
    <div className="event-container">
      {/* Header Section */}
      <div
        className="event-header"
        style={{ backgroundImage: '/images/campus.jpg' }}
      >
        <h1 className="event-title">NSS CLEANING DRIVE 1</h1>
      </div>

      {/* Event Content */}
      <div className="event-content">
        <div className="event-card">
          <img
            src='/images/DSC09569.JPG'
            alt="NSS Cleaning Drive 1"
            className="event-card-image"
          />
          <div className="event-card-text">
            <h2>NSS Cleaning Drive 1</h2>
            <p>
              <strong>Date:</strong> October 22, 2024<br />
              <strong>Day:</strong> Tuesday<br />
              <strong>Hours:</strong> 4 Hours<br />
              <strong>Students Attended:</strong> 50<br />
              <br></br>
            </p>
            <p>
            The first NSS Cleaning Drive focused on creating a cleaner and healthier environment in our community. Volunteers gathered early in the morning and diligently cleaned public areas, collecting and properly disposing of waste. The drive emphasized the importance of maintaining hygiene and keeping public spaces free from litter. It was inspiring to see individuals from all walks of life come together for this cause, showcasing the power of collective action.
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default EventDetail2;
