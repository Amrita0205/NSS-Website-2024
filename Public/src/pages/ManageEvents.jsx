import React, { useState } from 'react';
import EventCard from '../components/EventCard';
import AddEventModal from '../components/AddEventModal';
import EditEventModal from '../components/EditEventModal';
import DeleteConfirmation from '../components/DeleteConfirmation';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

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
      <div className="bg-black text-white flex flex-col items-center justify-center h-32 mt-32">
        <h1 className="text-4xl font-extrabold mb-4 tracking-wide">Manage Events</h1>
        <p className="text-lg font-light opacity-80">Organize and manage events effortlessly.</p>
      </div>

      <div className="flex items-center justify-center py-8">
        <button
          className="bg-green-600 text-white px-6 py-3 h-16 w-40 rounded-lg shadow-md hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition duration-300 flex items-center justify-center gap-2"
          onClick={() => setAddModalOpen(true)}
        >
          <span className="text-xl font-semibold">Add Event</span>
        </button>
      </div>

      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="text-center col-span-full py-16 text-gray-500">
                  <p className="text-lg">No events available. Click "Add Event" to create one.</p>
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
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ManageEvents;
