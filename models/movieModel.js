const mongoose = require('mongoose')
const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter movie name"],
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    movie_thumbnail: {
        type: String,
        required: true,
    },
    trailer:{
        type: String,
        required: true,
    },
    episode: {
        type: Array,
       
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
       
    },

    views: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
})

const Movie = mongoose.model('Movie', movieSchema)
module.exports = Movie