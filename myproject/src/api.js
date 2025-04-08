// src/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001' });

export const fetchEvents = async () => {
    try {
        const response = await API.get('/event');
        return response.data;
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
};

export const createEvent = async (eventData) => {
    try {
        const response = await API.post('/event', eventData);
        return response.data;
    } catch (error) {
        console.error("Error creating event:", error);
        throw error;
    }
};

export const getEventById = async (id) => {
    try {
        const response = await API.get(`/event/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching event by ID:", error);
        throw error;
    }
};

export const updateEvent = async (id, updatedData) => {
    try {
        const response = await API.patch(`/event/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating event:", error);
        throw error;
    }
};

export const searchEvents = async (query) => {
    try {
        const response = await API.get(`/event/search`, { params: query });
        return response.data;
    } catch (error) {
        console.error("Error searching events:", error);
        throw error;
    }
};
