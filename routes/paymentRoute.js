const express = require("express")
const {
    createPayment, 
    getaPayment,
    getAllPayment, 
    changeStatus,
    getPaymentAnalysis 

} = require("../controllers/paymentController")
const { requireAuthAdmin,  requireAuth } = require("../middleware/authMiddleware");
const router = express.Router()


router.post("/add",requireAuth,createPayment)
router.get("/:id",getaPayment)
router.post("/change",requireAuthAdmin,changeStatus)

router.get("/", getAllPayment)
router.get("/analysis/payment", getPaymentAnalysis)

module.exports = router