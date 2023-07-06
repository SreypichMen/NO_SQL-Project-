const mongoose = require('mongoose')
const bannerSchema = mongoose.Schema({
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
    image:{
        type: String,
        required: true,
    },
   
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BannerCategory",
        required: true,
    }, 
    movie:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
    }

}, {
    timestamps: true
})

const Banner= mongoose.model('banner',  bannerSchema)
module.exports = Banner