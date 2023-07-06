const banner_category= require("../models/bannerCateModel")
const banner= require("../models/BannerModel")
const asyncHandler = require("express-async-handler")



const createCategoryBanner = asyncHandler(async(req, res) => {
    try {
        const newCategoryBanner = await banner_category.create(req.body)
        res.json(newCategoryBanner)
    } catch (error) {
        throw new Error(error)
    }
})
//create banner
    const createBanner = asyncHandler(async(req, res) => {
        try {
            const newBanner = await banner.create(req.body)
            res.json(newBanner)
        } catch (error) {
            throw new Error(error)
        }
    })

    //get category 
const getaBannerCate = asyncHandler(async(req, res) => {
    const { id } = req.params
    try {
        const findaCateBanner = await banner_category.findById(id)
        res.json( findaCateBanner )
    } catch (error) {
        throw new Error(error)
    }
})
//get banner
const getaBanner = asyncHandler(async(req, res) => {
    const { id } = req.params
    try {
        const findBanner= await banner.findById(id)
        res.json(findBanner)
    } catch (error) {
        throw new Error(error)
    }
})

//get all categories
const getAllCategory = asyncHandler(async(req, res) => {
    try {
        const getallcategories = await banner_category.find()
        res.json(getallcategories)
    } catch (error) {
        throw new Error(error)
    }
})
//get all banners
const getAllBanner = asyncHandler(async(req, res) => {
    try {
        const getallbanners = await banner.find(req.query)
        res.json(getallbanners )
    } catch (error) {
        throw new Error(error)
    }
    // try {
    //     const all = await banner.find().populate(["Category"]);
    //     res.json({ success: true, data: all });
    //   } catch (error) {
    //     res.json({ success: false, error: error });
    //   }
})

//update category
const updateCategory = asyncHandler(async(req, res) => {
    const { id } = req.params
    const { category_name } = req.body
    try {
        const doc = await banner_category.findById(id)

        if (category_name) doc.category_name = category_name
        await doc.save()
        res.json({ success: true, data: doc })
    } catch (error) {
        res.json({ sucess: false, error: error })
    }
})


//update movie
const updateBanner = asyncHandler(async(req, res) => {
        const { id } = req.params
        const { title, description, type,image,category} = req.body
        try {
            const doc = await banner.findById(id)

            if (title) doc.title = title
            if (description) doc.description = description
            if (type) doc.type = type
            if (image) doc.image = image
            if (category) doc.category = category

            await doc.save()
            res.json({ success: true, data: doc })
        } catch (error) {
            res.json({ sucess: false, error: error })
        }
    })
    //delete category
const delete_category = async(req, res) => {
    const { id } = req.params;
    try {
        const deleting = await banner_category.deleteOne({ _id: id });
        res.json({ success: true, data: deleting });
    } catch (error) {
        res.json({ success: false, error: error });
    }
};

//delete movie
const delete_banner = async(req, res) => {
    const { id } = req.params;
    try {
        const deleting = await banner.deleteOne({ _id: id });
        res.json({ success: true, data: deleting });
    } catch (error) {
        res.json({ success: false, error: error });
    }
};
module.exports = {
    createCategoryBanner,
    createBanner, 
    getaBannerCate, 
    getaBanner, 
    getAllCategory, 
    getAllBanner,
    updateCategory, 
    updateBanner, 
    delete_category, 
    delete_banner 
}
