import '../config/connection.js';
import notificationSchemaModel from '../models/notificationModel.js';

//  Send Notification to User
export const sendNotification = async (req, res) => {
    try {
        let { userId, eventId, message } = req.body;

        let newNotification = await notificationSchemaModel.create({
            userId, eventId, message, timestamp: Date()
        });

        res.status(201).json({ "status": true, "message": "Notification sent successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ "status": false, "error": err.message });
    }
};

//  Fetch Notifications for a User
export const fetchNotifications = async (req, res) => {
    try {
        let { userId } = req.query;
        let notifications = await notificationSchemaModel.find({ userId });

        if (notifications.length > 0) {
            res.status(200).json({ notifications });
        } else {
            res.status(404).json({ "message": "No notifications found" });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ "error": err.message });
    }
};

//  Delete a Notification
export const deleteNotification = async (req, res) => {
    try {
        let { notificationId } = req.params;
        let deletedNotification = await notificationSchemaModel.findOneAndDelete({ _id: notificationId });

        if (deletedNotification) {
            res.status(200).json({ "status": true, "message": "Notification deleted successfully" });
        } else {
            res.status(404).json({ "status": false, "message": "Notification not found" });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ "error": err.message });
    }
};
