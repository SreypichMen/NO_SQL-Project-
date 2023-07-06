const mongoose = require('mongoose')
const sub_movieSchema = mongoose.Schema({
    Subcategory_name: {
        type: String,
        required: true,
        unique: true
    },
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    }

}, {

    timestamps: true
})

const SubcateMovie = mongoose.model('Subcategory', sub_movieSchema)
module.exports = SubcateMovie