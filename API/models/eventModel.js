import mongoose from "mongoose";

const EventSchema = mongoose.Schema({
    _id: Number,
    name: {
        type: String,
        required: [true, 'Event name is required'],
        trim: true,
    },
    category:{
        type: String,
        
    },
    date:{ 
        type: String,
        required: true,
    },

    time:{
        type: String,
        required:true,
    },

    location:{
        type: String,
        required: true,
        trim : true,
    },

    description:{
        type: String,
        required: true,
        trim : true,
    },
    status: {
        type: String,
        enum: ["upcoming", "ongoing", "completed"],
        default: "upcoming",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
   
});

const eventSchemaModel = mongoose.model('event_collection', EventSchema);
export default eventSchemaModel;