const mongoose = require('mongoose')
const subSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter movie name"],
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
   price: {
        type: Number,
        required: true,
    },
    value: {
        type: Number,
     
    }


}, {
    timestamps: true
})

const Sub = mongoose.model('Subscription',subSchema)
module.exports = Sub