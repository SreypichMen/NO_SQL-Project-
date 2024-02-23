const express = require("express")
const {
    createRate,
    getRate,
    getAllRates,
    updateRate,
    deleteRate

} = require("../controllers/rateController")
const { requireAuthAdmin } = require("../middleware/authMiddleware");
const router = express.Router()

router.post("/add", createRate)
router.get("/:id", getRate)

router.put("/:id",updateRate)
router.delete("/:id", deleteRate)
router.get("/", getAllRates)  

module.exports = router
