import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import ScrollToTopButton from './components/ScrollToTop';
import './App.css';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://todo-app-jl8c.onrender.com/api'  // Update with your backend URL
  : 'http://localhost:9000/api';

function App() {
  const [events, setEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch upcoming events (done=false)
      const upcomingResponse = await axios.get(`${API_BASE_URL}/events/?done=false`);
      setEvents(upcomingResponse.data);
      
      // Fetch completed events (done=true)
      const completedResponse = await axios.get(`${API_BASE_URL}/events/?done=true`);
      setCompletedEvents(completedResponse.data);
    } catch (err) {
      setError('Failed to fetch events');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData) => {
    try {
      await axios.post(`${API_BASE_URL}/events/`, eventData);
      await fetchData(); // Refresh the data
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  };

  const markEventDone = async (eventId) => {
    try {
      await axios.patch(`${API_BASE_URL}/events/${eventId}/mark-done/`);
      await fetchData(); // Refresh the data
    } catch (error) {
      console.error('Error marking event done:', error);
      throw error;
    }
  };

  const markEventUndone = async (eventId) => {
    try {
      await axios.patch(`${API_BASE_URL}/events/${eventId}/mark-undone/`);
      await fetchData(); // Refresh the data
    } catch (error) {
      console.error('Error marking event undone:', error);
      throw error;
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`${API_BASE_URL}/events/${eventId}/`);
      await fetchData(); // Refresh the data
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error">
          {error}
          <button onClick={fetchData} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🗓️ Todo List App</h1>
        <nav className="nav-tabs">
          <button 
            onClick={() => setShowCompleted(false)}
            className={`nav-tab ${!showCompleted ? 'active' : ''}`}
          >
            📝 Upcoming ({events.length})
          </button>
          <button 
            onClick={() => setShowCompleted(true)}
            className={`nav-tab ${showCompleted ? 'active' : ''}`}
          >
            ✅ Completed ({completedEvents.length})
          </button>
        </nav>
      </header>

      <main className="main-content">
        {!showCompleted ? (
          <div>
            <EventForm onCreateEvent={createEvent} />
            <EventList 
              events={events} 
              onMarkDone={markEventDone}
              onDelete={deleteEvent}
              isCompleted={false}
              title="Upcoming Events"
            />
          </div>
        ) : (
          <EventList 
            events={completedEvents} 
            onMarkUndone={markEventUndone}
            onDelete={deleteEvent}
            isCompleted={true}
            title="Completed Events"
          />
        )}
      </main>
      <ScrollToTopButton />
    </div>
  );
}

export default App;