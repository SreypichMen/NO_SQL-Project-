const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter movie name"],
        unique: true
    },
    duration: {
        type: Number, // Changed to Number
        required: true,
    },
    kind: [{
        type: String, // Array of strings
        required: true
    }],
    year: {
        type: Number, // Changed to Number
        required: true,
    },
    natio: {
        type: String,
        required: true,
    },
    description: {
        type: String,
       
    },
    movie_thumbnail: {
        type: String,
        required: true,
    },
    director: {
        type: {
            lastname: String, // Nested object with string properties
            firstname: String
        },
        required: true,
    },
    Act: [{
        lastname: String, // Array of objects with string properties
        firstname: String,  
       
    }], 
    averageRate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "rate"
    }, 
    views: {
        type: Number, // Define 'views' as a Number type
        default: 0     // Set a default value if needed
    }
}, {
    timestamps: true
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
