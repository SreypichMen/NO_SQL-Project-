const Movie = require("../models/movieModel")
const SubcateMovie = require("../models/movieSubCateModel")
const CateMovie = require("../models/movieCateModel")
const asyncHandler = require("express-async-handler")

//create Category
const createCategoryMovie = asyncHandler(async (req, res) => {
    try {
        const newCategoryMovie = await CateMovie.create(req.body)
        res.json(newCategoryMovie)
    } catch (error) {
        throw new Error(error)
    }
})
//create Subcategory
const createSubcategoryMovie = asyncHandler(async (req, res) => {
    try {
        const newSubcategoryMovie = await SubcateMovie.create(req.body)
        res.json(newSubcategoryMovie)
    } catch (error) {
        throw new Error(error)
    }
})
//create Movie
const createMovie = asyncHandler(async (req, res) => {
    try {
        const newMovie = await Movie.create(req.body)
        res.json(newMovie)
    } catch (error) {
        throw new Error(error)
    }
})

//get category 
const getaMovieCate = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const findMovie = await CateMovie.findById(id)
        res.json(findMovie)
    } catch (error) {
        throw new Error(error)
    }
})
//get subcategory
const getaSubMovie = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const findMovie = await SubcateMovie.findById(id)
        res.json(findMovie)
    } catch (error) {
        throw new Error(error)
    }
})
//get movie
const getaMovie = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const findMovie = await Movie.findById(id)
        if (findMovie) {
            findMovie.views = findMovie.views + 1
            await findMovie.save()
        }
        res.json(findMovie)
    } catch (error) {
        throw new Error(error)
    }
})

//get all categories
const getAllCategory = asyncHandler(async (req, res) => {
    try {
        const getallcategories = await CateMovie.find()
        res.json(getallcategories)
    } catch (error) {
        throw new Error(error)
    }
})
//get all subcategories
const getAllSubCategory = asyncHandler(async (req, res) => {
    try {
        const getAllSubCategories = await SubcateMovie.find().populate("Category")
        res.json(getAllSubCategories)
    } catch (error) {
        throw new Error(error)
    }
})
//get all movies
const getAllMovie = async (req, res) => {

    try {
        const getallmovies = await Movie.find(req.query).populate("subcategory");
        res.json(getallmovies)
    } catch (error) {
        throw new Error(error)
    }
    //get all products with populate

    //     const { page, item_per_page, title } = req.query;

    //   try {
    //     //default option paginate
    //     let options = {
    //       page: 1,
    //       limit: 10,
    //       populate: ["subcategory"],
    //     };

    //     //modify option paginate
    //     if (page) options.page = page;
    //     if (item_per_page) options.limit = item_per_page;

    //     //filter
    //     let filter = {};
    //     if (title) {
    //       const regex = new RegExp(title, "i");
    //       filter.title = { $regex: regex };
    //     }

    //     const all = await Movie.paginate(filter, options);

    //     res.json({ success: true, data: all });
    //   } catch (error) {
    //     res.json({ success: false, error: error });
    //   }
}
const get_by_filter = async (req, res) => {
    const { subcat_id, cate_id } = req.query;

    try {
        let filter = {};

        if (subcat_id) filter.subcategory = subcat_id;
        let doc = await Movie.find(filter).populate('subcategory');

        let new_doc = [];

        if (cate_id) {
            doc.forEach((item) => {
                if (item.subcategory.Category == cate_id) {
                    new_doc.push(item)
                }
            })
        }

        let final = [];
        if (subcat_id) final = doc;
        if (cate_id) final = new_doc;

        res.json({ success: true, data: final });
    } catch (error) {
        res.json({ success: false, error: error });
    }
};

const get_all_populate = async (req, res) => {
    try {
        const all = await Movie.find().populate(["subcategory"]);
        res.json({ success: true, data: all });
    } catch (error) {
        res.json({ success: false, error: error });
    }
};

//update category
const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { Category_name } = req.body
    try {
        const doc = await CateMovie.findById(id)

        if (Category_name) doc.Category_name = Category_name
        await doc.save()
        res.json({ success: true, data: doc })
    } catch (error) {
        res.json({ sucess: false, error: error })
    }
})

// update subcategory
const updateSubcategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { Category, Subcategory_name } = req.body
    try {
        const doc = await SubcateMovie.findById(id)

        if (Category) doc.Category = Category
        if (Subcategory_name) doc.Subcategory_name = Subcategory_name
        await doc.save()
        res.json({ success: true, data: doc })
    } catch (error) {
        res.json({ sucess: false, error: error })
    }
})

//update movie
const updateMovie = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { title, description, type, movie_thumbnail, year, episode, subcategory, trailer, movie_link } = req.body
    try {
        const doc = await Movie.findById(id)

        if (title) doc.title = title
        if (description) doc.description = description
        if (type) doc.type = type
        if (movie_thumbnail) doc.movie_thumbnail = movie_thumbnail
        if (year) doc.year = year
        if (episode) doc.episode = episode
        if (trailer) doc.trailer = trailer
        if (movie_link) doc.movie_link = movie_link
        if (subcategory) doc.subcategory = subcategory

        await doc.save()
        res.json({ success: true, data: doc })
    } catch (error) {
        res.json({ sucess: false, error: error })
    }
})
//delete category
const delete_category = async (req, res) => {
    const { id } = req.params;
    try {
        const deleting = await CateMovie.deleteOne({ _id: id });
        res.json({ success: true, data: deleting });
    } catch (error) {
        res.json({ success: false, error: error });
    }
};
// delete subcategory
const delete_subcategory = async (req, res) => {
    const { id } = req.params;
    try {
        const deleting = await SubcateMovie.deleteOne({ _id: id });
        res.json({ success: true, data: deleting });
    } catch (error) {
        res.json({ success: false, error: error });
    }
};
//delete movie
const delete_movie = async (req, res) => {
    const { id } = req.params;
    try {
        const deleting = await Movie.deleteOne({ _id: id });
        res.json({ success: true, data: deleting });
    } catch (error) {
        res.json({ success: false, error: error });
    }
};

const getMostViewed = async (req, res) => {
    try {
        const movies = await Movie.find()
            .sort({ views: -1 }) // Sort by views in descending order
            .limit(5); // Limit the result to the top 5 movies

        console.log(movies);

        const result = await Movie.aggregate([
            {
                $group: {
                    _id: null,
                    totalViews: { $sum: "$views" }
                }
            }
        ]);

        const totalViews = result[0].totalViews;
        console.log(totalViews);

        const totalMovies = await Movie.countDocuments();
        console.log(totalMovies);


        res.json({ success: true, data: { movies, totalViews, totalMovies } });
    } catch (error) {
        res.json({ success: false, error: error });
    }
}
module.exports = {
    createCategoryMovie,
    createSubcategoryMovie,
    createMovie,
    getaMovieCate,
    getaSubMovie,
    getaMovie,
    getAllCategory,
    getAllSubCategory,
    getAllMovie,
    updateCategory,
    updateSubcategory,
    updateMovie,
    delete_category,
    delete_subcategory,
    delete_movie,
    getMostViewed,
    get_all_populate,
    get_by_filter
}
