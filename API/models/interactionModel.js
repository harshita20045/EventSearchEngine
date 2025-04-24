import mongoose from "mongoose";

const InteractionSchema = mongoose.Schema({
    userId:{
        type: Number,
        required: true
    },
    eventId:{
        type: Number,
        required: true
    },
    type:{
        type: String,
        required: true,
        enum:["joined", "favorite"]
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
});

const interactionSchemaModel = mongoose.model('interaction_collection', InteractionSchema);

export default interactionSchemaModel;