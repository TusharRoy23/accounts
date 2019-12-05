import mongoose from 'mongoose';

var SubHeadSchema = new mongoose.Schema({
    HeadName: {
        type: String,
        required: true,
        trim: true
    },
    subHeadName: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Number,
        default: 1    
    }
});

export default mongoose.model('SubHead', SubHeadSchema);