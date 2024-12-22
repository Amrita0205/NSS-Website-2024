import React from 'react';
import { Link } from 'react-router-dom';
import './App_event.css';

function AppEventSection() {
  const events = [
    { id: 1, name: 'Tree Plantation Drive', image: '/images/IMG_0640.JPG', link: '/event1' },
    { id: 2, name: 'NSS Cleaning Drive 1', image: '/images/DSC09569.JPG', link: '/event2' },
    { id: 3, name: 'NSS Cleaning Drive 2', image: '/images/DSC09533.JPG', link: '/event3' },
    { id: 4, name: 'Orphanage Visit', image: '/images/DSC09262.JPG', link: '/event4' },
  ];

    return (
      <div className="App_event">
        {/* <h2 className="App_event-title">Upcoming Events</h2> */}
        <div className="App_event-grid">
          {events.map(event => (
            <Link to={event.link} key={event.id} className="App_event-card">
              {/* Blurred Image */}
              <div
                className="App_event-card-image"
                style={{ backgroundImage: `url(${event.image})` }}
              ></div>
  
              {/* Overlay with Event Name */}
              <div className="App_event-card-overlay">
                <h3>{event.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
}

export default AppEventSection;
