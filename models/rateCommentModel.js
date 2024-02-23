const mongoose = require('mongoose');

const rateSchema = mongoose.Schema({
    rate: {
        type: Number, // Changed to Number
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
    },
    averageRate: {
        type: Number,
        default: 0 // Default value for the average rate
    }
    
}, {
    timestamps: true
});

const rateComment= mongoose.model('rate', rateSchema);
module.exports =rateComment;
