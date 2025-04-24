import express from 'express';
const router = express.Router();
import * as notificationController from '../controller/notificationController.js';

// Routes
router.post("/send", notificationController.sendNotification); // Send Notification
router.get("/fetch", notificationController.fetchNotifications); // Fetch User Notifications
router.delete("/delete/:id", notificationController.deleteNotification); // Delete a specific notification

export default router;
