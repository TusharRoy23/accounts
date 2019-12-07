import mongoose from 'mongoose';

var SubSubHeadSchema = new mongoose.Schema({
    subHeadID: {
        type: mongoose.Schema.ObjectId,
        required: true,
        trim: true
    },
    subSubHeadName: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Number,
        default: 1    
    }
});

export default mongoose.model('SubSubHead', SubSubHeadSchema);