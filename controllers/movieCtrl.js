const Movie = require("../models/movieModel");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const validateMongoDBId = require("../utils/validateMongodbid");

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
        const getAllMovies = await Movie.find(req.query)
        res.json(getAllMovies);
    } catch (error) {
        throw new Error(error);
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
