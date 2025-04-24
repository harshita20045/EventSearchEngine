import mongoose from "mongoose";

const NotificationSchema = mongoose.Schema({
    userId: { type: Number, required: true },
    eventId: { type: Number, required: false },
    message: { type: String, required: true, trim: true },
    timestamp: { type: Date, default: Date.now }
});

const notificationSchemaModel = mongoose.model('notification_collection', NotificationSchema);
export default notificationSchemaModel;
