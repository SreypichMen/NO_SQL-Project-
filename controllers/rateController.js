const Movie = require("../models/movieModel");
const User = require("../models/User");
const Rate = require("../models/rateCommentModel"); // Renamed from 'rate' to 'Rate' to match the model name convention
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const validateMongoDBId = require("../utils/validateMongodbid");

//create Rate
const createRate = asyncHandler(async (req, res) => {
    try {
        const newRate = await Rate.create(req.body);
        res.json(newRate);
    } catch (error) {
        throw new Error(error);
    }
});

const getRate = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ success: false, message: 'Rate ID is missing.' });
        }
        
        const findRate = await Rate.findById(id);
        if (!findRate) {
            return res.status(404).json({ success: false, message: 'Rate not found.' });
        }
       
        res.json(findRate);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


//get all rates
const getAllRates = async (req, res) => {

    try {
        const getAllRates = await Rate.find(req.query)
        res.json(getAllRates);
    } catch (error) {
        throw new Error(error);
    }
};

const updateRate = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { rate, comment } = req.body;
    try {
        const doc = await Rate.findById(id);

        if (!doc) {
            return res.status(404).json({ success: false, message: 'Rate not found.' });
        }

        if (rate) doc.rate = rate;
        if (comment) doc.comment = comment;

        await doc.save();
        res.json({ success: true, data: doc });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

//delete rate
const deleteRate = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ success: false, message: 'Rate ID is missing.' });
        }
        
        const deleting = await Rate.deleteOne({ _id: id });
        if (!deleting) {
            return res.status(404).json({ success: false, message: 'Rate not found.' });
        }
        
        res.json({ success: true, data: deleting });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    createRate,
    getRate,
    getAllRates,
    updateRate,
    deleteRate,
};
