const express = require("express")
const {
    createMovie,
    createCategoryMovie,
    createSubcategoryMovie,
    getaMovie,
    getaMovieCate,
    getaSubMovie,
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

} = require("../controllers/movieCtrl")
const { requireAuthAdmin } = require("../middleware/authMiddleware");
const router = express.Router()


router.post("/category/add",  createCategoryMovie)
router.get("/category/:id", getaMovieCate)
router.put("/category/:id",  updateCategory)
router.delete("/category/:id", delete_category)
router.get("/category/", getAllCategory)

router.post("/subcategory/add", createSubcategoryMovie)
router.put("/subcategory/:id", updateSubcategory)
router.get("/subcategory/:id", getaSubMovie)
router.delete("/subcategory/:id", delete_subcategory)
router.get("/subcategory/", getAllSubCategory)

router.post("/add", createMovie)
router.get("/:id", getaMovie)
router.put("/:id", updateMovie)
router.delete("/:id",  delete_movie)
router.get("/", getAllMovie)
router.get("/all/filter", get_by_filter);
router.get("/all_populate", get_all_populate);
router.get("/analysis/mostviewed", getMostViewed)

module.exports = router
