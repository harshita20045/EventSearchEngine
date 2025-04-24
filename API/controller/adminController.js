import '../config/connection.js';
import userSchemaModel from '../models/userModel.js';
import eventSchemaModel from '../models/eventModel.js';

// user ko fetch kerne ke liye (For Admin Panel)
export const getAllUsers = async (req, res) => {
    try {
        const users = await userSchemaModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ "msg": "Error fetching users", error: error.message });
    }
};

//  user ke status ko update kerne ke liye (Activate/Deactivate Users)
export const updateUserStatus = async (req, res) => {
    try {
        const { email, status } = req.params;
        const user = await userSchemaModel.findOneAndUpdate(
            { email },
            { $set: { status } },
            { new: true }
        );
        if (user) res.status(200).json({ "msg": "User status updated", user });
        else res.status(404).json({ "msg": "User not found" });
    } catch (err) {
        res.status(500).json({ "msg": "Error updating status" });
    }
};

// Delete User
export const deleteUser = async (req, res) => {
    try {
        const { email } = req.body;
        const deletedUser = await userSchemaModel.findOneAndDelete({ email });
        if (deletedUser) res.status(200).json({ "msg": "User deleted" });
        else res.status(404).json({ "msg": "User not found" });
    } catch (err) {
        res.status(500).json({ "msg": "Error deleting user" });
    }
};

//  Fetch All Events (For Moderation)
export const getAllEvents = async (req, res) => {
    try {
        const events = await eventSchemaModel.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ "msg": "Error fetching events",  error: error.message });
    }
};

// Approve Event (event status change kerne ke liye)
export const approveEvent = async (req, res) => {
    try {
        const { eventId, status } = req.body;
        const event = await eventSchemaModel.findOneAndUpdate(
            { _id: eventId },
            { $set: { status } },
            { new: true }
        );
        if (event) res.status(200).json({ "msg": "Event status updated", event });
        else res.status(404).json({ "msg": "Event not found" });
    } catch (error) {
        res.status(500).json({ "msg": "Error updating event", error: error.message });
    }
};

//  Delete Event
export const deleteEvent = async (req, res) => {
    try {
        const { eventId } = req.body;
        const deletedEvent = await eventSchemaModel.findOneAndDelete({ _id: eventId });
        if (deletedEvent) res.status(200).json({ "msg": "Event deleted" });
        else res.status(404).json({ "msg": "Event not found" });
    } catch (error) {
        res.status(500).json({ "msg": "Error deleting event",  error: error.message });
    }
};
