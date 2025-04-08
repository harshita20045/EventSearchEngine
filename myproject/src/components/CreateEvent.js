import React, { useState } from 'react';
import { createEvent } from '../api';

const CreateEvent = () => {
    const [eventData, setEventData] = useState({ name: '', description: '', location: '', date: '' , category: ''});

    const handleChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting Event:", eventData); // ✅ Debugging ke liye
        try {
            await createEvent(eventData);
            alert('Event created successfully!');
        } catch (error) {
            console.error("Error creating event:", error);
            alert('Error creating event.');
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Event Name" onChange={handleChange} required />
            <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
            <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
            <input type="date" name="date" onChange={handleChange} required />
            <input type="text" name="category" placeholder="Category" onChange={handleChange} required />

            <button type="submit">Create Event</button>
        </form>
    );
};

export default CreateEvent;