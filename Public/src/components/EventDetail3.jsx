import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import '../views/Event.css';

// Import images
// import campusImage from './assets/IIIT.JPG';
// import eventImage from '/images/IMG_0640.JPG';

function EventDetail3() {
  return (
    <>
    <Navbar/>
    <div className="event-container">
      {/* Header Section */}
      <div
        className="event-header"
        style={{ backgroundImage: '/images/campus.jpg' }}
      >
        <h1 className="event-title">NSS CLEANING DRIVE 2</h1>
      </div>

      {/* Event Content */}
      <div className="event-content">
        <div className="event-card">
          <img
            src='/images/DSC09533.JPG'
            alt="NSS Cleaning Drive 2"
            className="event-card-image"
          />
          <div className="event-card-text">
            <h2>NSS Cleaning Drive 2</h2>
            <p>
              <strong>Date:</strong> December 8, 2024<br />
              <strong>Day:</strong> Sunday<br />
              <strong>Hours:</strong> 4 Hours<br />
              <strong>Students Attended:</strong> 60<br />
              <br></br>
            </p>
            <p>
            Building on the success of the first drive, the second NSS Cleaning Drive aimed to cover new areas and further spread the message of cleanliness. Volunteers displayed remarkable dedication by cleaning streets, parks, and public spaces while engaging with locals to encourage waste segregation and recycling practices. This initiative played a vital role in promoting a cleaner environment and a stronger community spirit.
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default EventDetail3;
