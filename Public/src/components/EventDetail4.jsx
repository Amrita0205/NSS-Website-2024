import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import '../views/Event.css';

// Import images
// import campusImage from './assets/IIIT.JPG';
// import eventImage from '/images/DSC09262.JPG';

function EventDetail4() {
  return (
    <>
    <Navbar/>
    <div className="event-container">
      {/* Header Section */}
      <div
        className="event-header"
        style={{ backgroundImage: '/images/campus.jpg' }}
      >
        <h1 className="event-title">ORPHANAGE VISIT</h1>
      </div>

      {/* Event Content */}
      <div className="event-content">
        <div className="event-card">
          <img
            src='/images/DSC09262.JPG'
            alt="Orphanage Visit"
            className="event-card-image"
          />
          <div className="event-card-text">
            <h2>Orphanage Visit</h2>
            <p>
              <strong>Date:</strong> November 30, 2024<br />
              <strong>Day:</strong> Saturday<br />
              <strong>Hours:</strong> 5 Hours<br />
              <strong>Students Attended:</strong> 55<br />
              <br></br>
            </p>
            <p>
            The Orphanage Visit was a heartwarming event where volunteers spent quality time with children, bringing smiles to their faces. Activities included interactive games, storytelling sessions, and distributing gifts to the children. Volunteers also engaged in meaningful conversations, emphasizing education and personal growth. This visit was a beautiful reminder of the joy of giving and the impact of small acts of kindness.
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default EventDetail4;
