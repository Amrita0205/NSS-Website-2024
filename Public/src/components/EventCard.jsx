import React from 'react';
import './EventCard.css'

const EventCard = ({ event, onEdit, onDelete }) => {
  return (
    <div className="event-card">
      <h2 className="event-title">{event.title}</h2>
      <p className="event-details">Date: {event.date.split('T')[0]}</p>
      {/* <p className="event-details">Venue: {event.venue}</p> */}
      <p className="event-description">{event.description}</p>
      <div className="event-actions">
        <button
          className="edit-btn"
          onClick={() => onEdit(event)}
        >
          Edit
        </button>
        <button
          className="delete-btn"
          onClick={() => onDelete(event.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventCard;
