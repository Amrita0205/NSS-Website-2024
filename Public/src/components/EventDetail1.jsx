import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import '../views/Event.css';

// Import images
// import campusImage from './assets/IIIT.JPG';
// import eventImage from '/images/IMG_0640.JPG';

function EventDetail() {
  return (
    <>
    <Navbar/>
    <div className="event-container">
      {/* Header Section */}
      <div
        className="event-header"
        style={{ backgroundImage: '/images/campus.jpg' }}
      >
        <h1 className="event-title">TREE PLANTATION DRIVE</h1>
      </div>

      {/* Event Content */}
      <div className="event-content">
        <div className="event-card">
          <img
            src='/images/IMG_0640.JPG'
            alt="Tree Plantation Event"
            className="event-card-image"
          />
          <div className="event-card-text">
            <h2>Tree Plantation Drive</h2>
            <p>
              <strong>Date:</strong> November 10, 2024<br />
              <strong>Day:</strong> Sunday<br />
              <strong>Hours:</strong> 3 Hours<br />
              <strong>Students Attended:</strong> 60<br />
              <br></br>
            </p>
            <p>
              The Tree Plantation Drive was a step towards a greener and cleaner
              environment. Volunteers actively participated by planting saplings
              across various locations, spreading awareness about the importance
              of trees in combating climate change and pollution. The event was
              not just about planting trees but also fostering a sense of
              responsibility toward nurturing them for a sustainable future.
              Everyone worked together enthusiastically, making it a fun and
              impactful day.
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default EventDetail;
