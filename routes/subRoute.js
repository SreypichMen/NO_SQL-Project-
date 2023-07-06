const express = require("express")
const {
    createSub, 
    getaSubPlan, 
    getAllSubPlans, 
    updatePlan,
    delete_plan 

} = require("../controllers/subController")
const { requireAuthAdmin } = require("../middleware/authMiddleware");
const router = express.Router()


router.post("/add", createSub)
router.get("/:id",  getaSubPlan)
router.put("/:id",  updatePlan)
router.delete("/:id",  delete_plan)
router.get("/",  getAllSubPlans)

module.exports = router