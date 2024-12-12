import React from 'react';

const EventCard = ({ event, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 m-2 w-80 border border-black">
      <h2 className="text-lg font-bold">{event.title}</h2>
      <p className="text-sm text-gray-600">Date: {event.date}</p>
      <p className="text-sm text-gray-600">Venue: {event.venue}</p>
      <p className="mt-2">{event.description}</p>
      <div className="flex justify-end mt-4">
        <button
          className="bg-yellow-500 px-4 py-1 rounded mr-2"
          onClick={() => onEdit(event)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 px-4 py-1 rounded"
          onClick={() => onDelete(event.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventCard;
