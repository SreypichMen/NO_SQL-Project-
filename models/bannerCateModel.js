const mongoose = require('mongoose')
const cate_bannerSchema = mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        unique: true
    },


}, {
    timestamps: true
})

const CateBan = mongoose.model('BannerCategory', cate_bannerSchema)
module.exports =  CateBan
