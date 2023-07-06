const express = require("express")
const {
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
} = require("../controllers/bannerController")
const { requireAuthAdmin } = require("../middleware/authMiddleware");
const router = express.Router()


router.post("/category/add", createCategoryBanner)
router.get("/category/:id",getaBannerCate)
router.put("/category/:id", updateCategory)
router.delete("/category/:id", delete_category)
router.get("/category/", getAllCategory)

router.post("/add",createBanner)
router.get("/:id", getaBanner)
router.put("/:id",  updateBanner)
router.delete("/:id", delete_banner )
router.get("/", getAllBanner)

module.exports = router