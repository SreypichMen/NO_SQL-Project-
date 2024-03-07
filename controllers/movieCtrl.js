const Movie = require("../models/movieModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const validateMongoDBId = require("../utils/validateMongodbid");
const Rate = require('../models/rateCommentModel');
const mongoose = require('mongoose');
const User = require('../models/User');
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
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid movie ID.' });
        }

        const findMovie = await Movie.findById(id);
        if (!findMovie) {
            return res.status(404).json({ success: false, message: 'Movie not found.' });
        }
       
        const rates = await Rate.find({ movie_id: id });
        const rateCount = rates.length;
        const totalRate = rates.reduce((sum, rate) => sum + rate.rate, 0);
        const averageRate = rateCount > 0 ? totalRate / rateCount : 0;

        // Populate user details for each rate
        const populatedRates = await Promise.all(rates.map(async rate => {
            const user = await User.findById(rate.user_id);
            return {
                ...rate.toObject(),
                user: user ? {
                    _id: user._id,
                    firstname: user.firstname,
                    // Add other user details you want to include
                } : null
            };
        }));

        const movieWithAverageRate = {
            ...findMovie.toObject(),
            user_rate: populatedRates, // Include user details in the user_rate array
            averageRate,
            rateCount
        };

        res.json(movieWithAverageRate);
    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
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


module.exports = {
    createMovie,
    getMovie,
    getAllMovies,
    updateMovie,
    deleteMovie,
   
};