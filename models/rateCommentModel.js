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
    
}, {
    timestamps: true
});

const rateComment= mongoose.model('rate', rateSchema);
module.exports =rateComment;
