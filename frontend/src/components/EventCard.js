import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

const EventCard = ({ event, onMarkDone, onMarkUndone, onDelete, isCompleted }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = (dueDateString) => {
    const dueDate = new Date(dueDateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today && !isCompleted;
  };

  const getDaysUntilDue = (dueDateString) => {
    const dueDate = new Date(dueDateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: '',
    action: null
  });

  const openModal = (title, message, type, action) => {
    setModalState({
      isOpen: true,
      title,
      message,
      type,
      action
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      title: '',
      message: '',
      type: '',
      action: null
    });
  };

  const handleMarkDone = () => {
    openModal(
      'Mark As Completed',
      'Are you sure you want to mark this event as completed?',
      'success',
      () => onMarkDone(event.id)
    );
  };

  const handleMarkUndone = () => {
    openModal(
      'Move to Upcoming',
      'Are you sure you want to move this event back to upcoming?',
      'warning',
      () => onMarkUndone(event.id)
    );
  };

  const handleDelete = () => {
    openModal(
      'Delete Event',
      'Are you sure you want to delete this event? This action cannot be undone.',
      'danger',
      () => onDelete(event.id)
    );
  };

  const overdue = isOverdue(event.due_date);
  const daysUntilDue = getDaysUntilDue(event.due_date);

  return (
    <>
      <div className={`event-card ${isCompleted ? 'completed' : ''} ${overdue ? 'overdue' : ''}`}>
        <div className="event-header">
          <h3>{event.title}</h3>
          {overdue && <span className="overdue-badge">⚠️ Overdue</span>}
        </div>
        
        {event.description && (
          <p className="description">{event.description}</p>
        )}
        
        <div className="event-dates">
          <div className="due-date">
            <span className="label">📅 Due:</span>
            <span className="date-due-text">{formatDate(event.due_date)}</span>
            {!isCompleted && (
              <span className={`days-info ${overdue ? 'overdue' : ''}`}>
                {overdue 
                  ? `(${Math.abs(daysUntilDue)} days overdue)` 
                  : daysUntilDue === 0 
                    ? '(Today!)' 
                    : daysUntilDue === 1 
                      ? '(Tomorrow)' 
                      : `(${daysUntilDue} days left)`
                }
              </span>
            )}
          </div>
          <div className="created-date">
            <span className="created-label">🕒 Created:</span>
            <span className="date">{formatDate(event.created_at)}</span>
          </div>
        </div>
        
        <div className="event-actions">
          {!isCompleted ? (
            <button onClick={handleMarkDone} className="btn btn-done">
              ✅ Mark as Done
            </button>
          ) : (
            <button onClick={handleMarkUndone} className="btn btn-undone">
              ↩️ Mark as Undone
            </button>
          )}
          <button onClick={handleDelete} className="btn btn-delete">
            🗑️ Delete
          </button>
        </div>
      </div>
      <ConfirmationModal
          isOpen={modalState.isOpen}
          onConfirm={modalState.action}
          onCancel={closeModal}
          onClose={closeModal}
          title={modalState.title}
          message={modalState.message}
          confirmText={modalState.type === 'danger' ? 'Delete' : 'Confirm'}
          cancelText="Cancel"
          type={modalState.type}
        />
      </>
  );
};

export default EventCard;