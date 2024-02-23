const Movie = require("../models/movieModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const validateMongoDBId = require("../utils/validateMongodbid");
const Rate = require('../models/rateCommentModel');
//create Movie
const createMovie = asyncHandler(async (req, res) => {
    try {
        const newMovie = await Movie.create(req.body);
        res.json(newMovie);
    } catch (error) {
        throw new Error(error);
    }
});

const getMovie = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ success: false, message: 'Movie ID is missing.' });
        }
        
        const findMovie = await Movie.findById(id);
        if (!findMovie) {
            return res.status(404).json({ success: false, message: 'Movie not found.' });
        }
       
        res.json(findMovie);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


//get all movies
const getAllMovies = async (req, res) => {
    try {
        // Fetch all movies
        const allMovies = await Movie.find();

        // Fetch average rate for each movie
        const moviesWithAverageRate = await Promise.all(allMovies.map(async movie => {
            const rates = await Rate.find({ movie_id: movie._id }); // Assuming 'movie_id' is the field in Rate model referencing the movie
            const rateCount = rates.length;
            const totalRate = rates.reduce((sum, rate) => sum + rate.rate, 0);
            const averageRate = rateCount > 0 ? totalRate / rateCount : 0;

            return {
                ...movie.toObject(), // Convert Mongoose document to plain JavaScript object
                averageRate,
                rateCount
            };
        }));

        res.json(moviesWithAverageRate);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateMovie = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, year, duration, kind, natio, movie_thumbnail, director, Act } = req.body;
    try {
        const doc = await Movie.findById(id);

        if (!doc) {
            return res.status(404).json({ success: false, message: 'Movie not found.' });
        }

        if (title) doc.title = title;
        if (description) doc.description = description;
        if (year) doc.year = year;
        if (duration) doc.duration = duration;
        if (kind) doc.kind = kind;
        if (natio) doc.natio = natio;
        if (movie_thumbnail) doc.movie_thumbnail = movie_thumbnail;
        if (director) {
            doc.director = {
                lastname: director.lastname,
                firstname: director.firstname
            };
        }
        if (Act) {
            doc.Act = Act.map(actor => ({
                lastname: actor.lastname,
                firstname: actor.firstname
            }));
        }

        await doc.save();
        res.json({ success: true, data: doc });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});



//delete movie
const deleteMovie = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ success: false, message: 'Movie ID is missing.' });
        }
        
        const deleting = await Movie.deleteOne({ _id: id });
        if (!deleting) {
            return res.status(404).json({ success: false, message: 'Movie not found.' });
        }
        
        res.json({ success: true, data: deleting });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
const getMostViewed = async (req, res) => {
    try {
        // Aggregate to get the top 5 most viewed movies
        const movies = await Movie.aggregate([
            { 
                $sort: { views: -1 } // Sort by views in descending order
            },
            { 
                $limit: 5 // Limit to the top 5 movies
            }
        ]);

        // Total views of all movies
        const result = await Movie.aggregate([
            { 
                $group: {
                    _id: null,
                    totalViews: { $sum: "$views" } // Sum of views of all movies
                }
            }
        ]);

        const totalViews = result.length > 0 ? result[0].totalViews : 0;

        // Total number of movies
        const totalMovies = await Movie.countDocuments();

        res.json({ success: true, data: { movies, totalViews, totalMovies } });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = {
    createMovie,
    getMovie,
    getAllMovies,
    updateMovie,
    deleteMovie,
    getMostViewed 
};
