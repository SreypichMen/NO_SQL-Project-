const mongoose = require('mongoose')
const cate_movieSchema = mongoose.Schema({
    Category_name: {
        type: String,
        required: true,
        unique: true
    },


}, {
    timestamps: true
})

const CateMovie = mongoose.model('Category', cate_movieSchema)
module.exports = CateMovie