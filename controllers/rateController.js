const Movie = require("../models/movieModel");
const User = require("../models/User");
const Rate = require("../models/rateCommentModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const validateMongoDBId = require("../utils/validateMongodbid");

// Create Rate
const createRate = asyncHandler(async (req, res) => {
    try {
        const newRate = await Rate.create(req.body);
        res.json(newRate);
    } catch (error) {
        throw new Error(error);
    }
});

// Get Rate by ID
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

// Get All Rates
const getAllRates = async (req, res) => {
    try {
        // Fetch all rates and populate movie and user details
        const allRates = await Rate.find(req.query)
            .populate('movie_id')
            .populate('user_id');

        // Aggregate rates to calculate average rate for each movie
        const ratesWithAverage = await Rate.aggregate([
            {
                $group: {
                    _id: "$movie_id", // Group by movie_id
                    averageRate: { $avg: "$rate" }, // Calculate average rate
                    count: { $sum: 1 } // Count number of rates for each movie
                }
            },
            {
                $lookup: {
                    from: "movies", // Collection to join with
                    localField: "_id",
                    foreignField: "_id",
                    as: "movie" // Output field name
                }
            },
            {
                $unwind: "$movie" // Flatten the movie array
            },
            {
                $project: { // Project the fields to include in the output
                    _id: 1,
                    averageRate: 1,
                    count: 1,
                    movie_id: "$movie._id", // Rename movie._id to movie_id
                    movie_title: "$movie.title" // Include movie title in the output
                }
            }
        ]);

        // Combine both data sets into one response object
        const combinedData = {
            allRates,
            ratesWithAverage
        };

        res.json(combinedData);
    } catch (error) {
        console.error("Error while fetching rates:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update Rate
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

// Delete Rate
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
