import '../config/connection.js';
import interactionSchemaModel from '../models/interactionModel.js';

//  User Joins an Event
export const joinEvent = async (req, res) => {
    try {
        let { userId, eventId } = req.body;
        let newInteraction = await interactionSchemaModel.create({
            userId, eventId, type: "joined", timestamp: Date()
        });
        res.status(201).json({ "status": true, "message": "User joined event successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ "status": false, "error": err.message });
    }
};

//  User Favorites an Event
export const favoriteEvent = async (req, res) => {
    try {
        let { userId, eventId } = req.body;
        let newInteraction = await interactionSchemaModel.create({
            userId, eventId, type: "favorite", timestamp: Date()
        });
        res.status(201).json({ "status": true, "message": "Event added to favorites" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ "status": false, "error": err.message });
    }
};

// User Removes Event from Favorites
export const unfavoriteEvent = async (req, res) => {
    try {
        let { userId, eventId } = req.body;
        let deletedInteraction = await interactionSchemaModel.deleteOne({
            userId,
            eventId,
            type: "favorite"
        });

        if (deletedInteraction.deletedCount > 0) {
            res.status(200).json({ "status": true, "message": "Event removed from favorites" });
        } else {
            res.status(404).json({ "status": false, "message": "Event not found in favorites" });
        }
    } catch (err) {
        console.error(err);  
        res.status(500).json({ "status": false, "error": err.message });
    }
};


//  User Unregisters from an Event
export const unregisterEvent = async (req, res) => {
    try {
        let { userId, eventId } = req.body;
        let deletedInteraction = await interactionSchemaModel.deleteOne({ userId, eventId, type: "joined" });

        if (deletedInteraction.deletedCount > 0) {
            res.status(200).json({ "status": true, "message": "User unregistered from event" });
        } else {
            res.status(404).json({ "status": false, "message": "User not registered for this event" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ "status": false, "error": err.message });
    }
};
