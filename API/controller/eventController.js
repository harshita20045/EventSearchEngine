import '../config/connection.js';
import eventSchemaModel from '../models/eventModel.js';

// Search Events API
export const searchEvent = async (req, res) => {
    try {
        let { query, location, organizer, startDate, endDate, page, limit } = req.query;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        let skip = (page - 1) * limit;

        let searchConditions = {};
        if (query) {
            searchConditions.$or = [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ];
        }
        if (location) searchConditions.location = { $regex: location, $options: 'i' };
        if (organizer) searchConditions.organizer = { $regex: organizer, $options: 'i' };
        if (startDate && endDate) {
            searchConditions.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        let events = await eventSchemaModel.find(searchConditions).skip(skip).limit(limit);
        let totalCount = await eventSchemaModel.countDocuments(searchConditions);

        res.status(events.length > 0 ? 200 : 404).json(events.length > 0 ? { events, currentPage: page, totalPages: Math.ceil(totalCount / limit), totalResults: totalCount } : { message: 'No events found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new event
export const createEvent = async (req, res) => {
    try {
        console.log("📩 Received Event Data:", req.body);  // ✅ Debugging ke liye 
        if (!req.body.category) {
            throw new Error("⚠ Missing category field in request!");
        }
        const event = new Event(req.body);
        await event.save();
        res.status(201).json({ status: true, message: "✅ Event created!", data: event });
    } catch (error) {
        console.error("❌ Error creating event:", error.message);
        res.status(500).json({ status: false, message: "Error creating event", error: error.message });
    }
};



// Fetch all events
export const fetchEvent = async (req, res) => {
    try {
        let events = await eventSchemaModel.find(req.query);
        res.status(200).json(events.length > 0 ? events : []);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single event by ID
export const getSingleEvent = async (req, res) => {
    try {
        let event = await eventSchemaModel.findById(req.params.id);
        res.status(event ? 200 : 404).json(event ? event : { message: 'Event not found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an event
export const updateEvent = async (req, res) => {
    try {
        let event = await eventSchemaModel.findById(req.params.id);
        if (event) {
            await eventSchemaModel.updateOne({ _id: req.params.id }, { $set: req.body });
            res.status(200).json({ message: 'Event updated successfully' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete an event
export const deleteEvent = async (req, res) => {
    try {
        let event = await eventSchemaModel.findById(req.params.id);
        if (event) {
            await eventSchemaModel.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: 'Event deleted successfully' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};