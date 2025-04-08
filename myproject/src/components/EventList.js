import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../api';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getEvents = async () => {
            try {
                const data = await fetchEvents();
                setEvents(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };
        getEvents();
    }, []);

    if (loading) return <p>Loading events...</p>;

    return (
        <div>
            <h2>Event List</h2>
            <ul>
                {events.map(event => (
                    <li key={event._id}>{event.name} - {event.location}</li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;