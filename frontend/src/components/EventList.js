import React from 'react';
import EventCard from './EventCard';

const EventList = ({ events, onMarkDone, onMarkUndone, onDelete, isCompleted, title }) => {
  if (events.length === 0) {
    return (
      <div className="event-list">
        <h2>{title}</h2>
        <div className="empty-state">
          <div className="empty-icon">
            {isCompleted ? '🎉' : '📝'}
          </div>
          <p>
            {isCompleted 
              ? 'No completed events yet. Complete some tasks to see them here!' 
              : 'No upcoming events. Create your first event above!'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="event-list">
      <h2>{title}</h2>
      <div className="events-grid">
        {events.map(event => (
          <EventCard
            key={event.id}
            event={event}
            onMarkDone={onMarkDone}
            onMarkUndone={onMarkUndone}
            onDelete={onDelete}
            isCompleted={isCompleted}
          />
        ))}
      </div>
    </div>
  );
};

export default EventList;