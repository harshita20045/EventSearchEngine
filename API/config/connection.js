
import mongoose from 'mongoose';

const url = "mongodb://127.0.0.1:27017/EventSearchEngine";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};

connectToDatabase();