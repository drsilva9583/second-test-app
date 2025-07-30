import React, { useState } from 'react';

const EventForm = ({ onCreateEvent }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.due_date) {
      newErrors.due_date = 'Due date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onCreateEvent(formData);
      setFormData({ title: '', description: '', due_date: '' });
      setErrors({});
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Error creating event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="event-form-container">
      <form onSubmit={handleSubmit} className="event-form">
        <h2>✨ Create New Event</h2>
        
        <div className="form-group">
          <label htmlFor="title">Event Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter event title..."
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter event description (optional)..."
            value={formData.description}
            onChange={handleChange}
            rows="2"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="due_date">Due Date *</label>
          <input
            type="date"
            id="due_date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            className={errors.due_date ? 'error' : ''}
            min={new Date().toISOString().split('T')[0]} // Prevent past dates
          />
          {errors.due_date && <span className="error-message">{errors.due_date}</span>}
        </div>
        
        <button type="submit" disabled={isSubmitting} className="submit-btn">
          {isSubmitting ? '⏳ Creating...' : '🚀 Create Event'}
        </button>
      </form>
    </div>
  );
};

export default EventForm;