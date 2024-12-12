import React, { useState } from 'react';
import EventCard from '../components/EventCard';
import AddEventModal from '../components/AddEventModal';
import EditEventModal from '../components/EditEventModal';
import DeleteConfirmation from '../components/DeleteConfirmation';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import './ManageEvents.css';

const ManageEvents = () => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Cleanliness drive', date: '2024-12-15', venue: 'Acad', description: 'To clean' },
    { id: 2, title: 'Poster making', date: '2024-12-20', venue: 'Music room', description: 'To make poster' }
  ]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleAddEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: Date.now() }]); // Adding unique id
    setAddModalOpen(false);
  };

  const handleUpdateEvent = (updatedEvent) => {
    setEvents(events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)));
    setEditModalOpen(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = () => {
    setEvents(events.filter((event) => event.id !== selectedEvent.id));
    setDeleteModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div>
      <Navbar />
      <div className="manage-events-header">
        <h1 className="manage-events-title">Manage Events</h1>
        <p className="manage-events-subtitle">Organize and manage events effortlessly.</p>
      </div>

      <div className="add-event-button-container">
        <button
          className="add-event-button"
          onClick={() => setAddModalOpen(true)}
        >
          <span className="add-event-text">Add Event</span>
        </button>
      </div>

      <div className="events-container">
        <div className="events-list">
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onEdit={() => {
                  setSelectedEvent(event);
                  setEditModalOpen(true);
                }}
                onDelete={() => {
                  setSelectedEvent(event);
                  setDeleteModalOpen(true);
                }}
              />
            ))
          ) : (
            <div className="no-events-message">
              <p className="no-events-text">No events available. Click "Add Event" to create one.</p>
            </div>
          )}
        </div>

        <AddEventModal
          isOpen={isAddModalOpen}
          onClose={() => setAddModalOpen(false)}
          onAdd={handleAddEvent}
        />

        {selectedEvent && (
          <EditEventModal
            isOpen={isEditModalOpen}
            onClose={() => setEditModalOpen(false)}
            event={selectedEvent}
            onUpdate={handleUpdateEvent}
          />
        )}

        {selectedEvent && (
          <DeleteConfirmation
            isOpen={isDeleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={handleDeleteEvent}
            eventTitle={selectedEvent.title}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ManageEvents;
