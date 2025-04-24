// 1st
//date 18-3-25 this is the main file 
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/connection.js'; // Database Connection

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
0
// Middleware
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3002"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(bodyParser.json({limit:'10mb'}));
app.use(bodyParser.urlencoded({ limit:'10mb', extended: true }));

import userRouter from './routes/userRouter.js';
import eventRoutes from './routes/eventRoutes.js';
import adminRouter from './routes/adminRouter.js';
import interactionRouter from './routes/interactionRouter.js';
import reviewRouter from './routes/reviewRouter.js';
import notificationRouter from './routes/notificationRouter.js';
import bookingRouter from './routes/bookingRouter.js';

// Routes
app.use("/user", userRouter);
app.use("/event", eventRoutes);
app.use("/admin", adminRouter);
app.use("/interaction", interactionRouter);
app.use("/review", reviewRouter);
app.use("/notification", notificationRouter);
app.use("/booking", bookingRouter);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Server Start
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

