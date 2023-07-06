const Sub = require("../models/subscriptionModel")
const asyncHandler = require("express-async-handler")

//create sub plan
const createSub = asyncHandler(async(req, res) => {
    try {
        const newSub= await Sub.create(req.body)
        res.json(newSub)
    } catch (error) {
        throw new Error(error)
    }
})
//get sub plan by id
const getaSubPlan = asyncHandler(async(req, res) => {
    const { id } = req.params
    try {
        const findSub = await Sub.findById(id)
        res.json(findSub)
    } catch (error) {
        throw new Error(error)
    }
})
//get all plans
const getAllSubPlans = asyncHandler(async(req, res) => {
    try {
        const getallcategories = await Sub.find()
        res.json(getallcategories)
    } catch (error) {
        throw new Error(error)
    }
})
//update movie
const updatePlan = asyncHandler(async(req, res) => {
    const { id } = req.params
    const { name,description,price, value} = req.body
    try {
        const doc = await Sub.findById(id)

        if (name) doc.name = name
        if (description) doc.description = description
        if (price) doc.price = price
        if (value) doc.value = value
     
        await doc.save()
        res.json({ success: true, data: doc })
    } catch (error) {
        res.json({ sucess: false, error: error })
    }
})
//delete category
const delete_plan = async(req, res) => {
const { id } = req.params;
try {
    const deleting = await Sub.deleteOne({ _id: id });
    res.json({ success: true, data: deleting });
} catch (error) {
    res.json({ success: false, error: error });
}
};
module.exports = {
    createSub, 
    getaSubPlan, 
    getAllSubPlans, 
    updatePlan,
    delete_plan 
}