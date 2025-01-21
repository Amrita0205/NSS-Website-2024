import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';
import AddEventModal from '../components/AddEventModal';
import EditEventModal from '../components/EditEventModal';
import DeleteConfirmation from '../components/DeleteConfirmation';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import './ManageEvents.css';

const API_URL = 'http://localhost:5000/api/v1/event'; // Replace with your Flask API base URL

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/all`);
      setEvents(response.data.events);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleAddEvent = async (newEvent) => {
    try {
      await axios.post(`${API_URL}/create`, newEvent);
      fetchEvents(); // Refresh the events list
      setAddModalOpen(false);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleUpdateEvent = async (updatedEvent) => {
    try {
      await axios.put(`${API_URL}/update`, updatedEvent);
      fetchEvents(); // Refresh the events list
      setEditModalOpen(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await axios.delete(`${API_URL}/delete`, {
        data: { event_ids: [selectedEvent.id] },
      });
      fetchEvents(); // Refresh the events list
      setDeleteModalOpen(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="manage-events-header">
        <h1 className="manage-events-title">Manage Events</h1>
        <p className="manage-events-subtitle">Organize and manage events effortlessly.</p>
      </div>

      <div className="add-event-button-container">
        <button className="add-event-button" onClick={() => setAddModalOpen(true)}>
          <span className="add-event-text">Add Event</span>
        </button>
      </div>

      <div className="events-container">
        <div className="events-list">
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard
                key={event._id}
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

        <AddEventModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} onAdd={handleAddEvent} />

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
