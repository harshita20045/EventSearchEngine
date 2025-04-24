import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const UserSchema = mongoose.Schema({
    _id: Number,
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        minlength: 5,
    },
    role: {
        type: String,
        enum: ['user', 'organizer', 'admin'],
        default: 'user'
    },
    status: {
        type: Number,
        default: 1
    },
    info: {
        type: String,
        default: Date.now
    }
}, { timestamps: true });

// Apply unique validator
UserSchema.plugin(mongooseUniqueValidator);

const userSchemaModel = mongoose.model('user_collection', UserSchema);
export default userSchemaModel;



