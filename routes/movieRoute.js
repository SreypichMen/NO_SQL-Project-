const express = require("express")
const {
    createMovie,
    getMovie,
    getAllMovies,
    updateMovie,
    deleteMovie,
    getMostViewed 
} = require("../controllers/movieCtrl")
const { requireAuthAdmin } = require("../middleware/authMiddleware");
const router = express.Router()

router.post("/add", createMovie)
router.get("/:id", getMovie)
router.put("/:id", updateMovie)
router.delete("/:id",  deleteMovie)
router.get("/", getAllMovies)
router.get("/views", getMostViewed )

module.exports = router
