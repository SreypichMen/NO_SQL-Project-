const payment = require("../models/paymentModel")
const asyncHandler = require("express-async-handler")
const User = require("../models/User")

//create payment
const createPayment = asyncHandler(async(req, res) => {
    try {
        const newPay= await payment.create(req.body)
        res.json({ success: true, data: newPay})
    } catch (error) {
        throw new Error(error)
    }
})
//get payment by id
const getaPayment = asyncHandler(async(req, res) => {
    const { id } = req.params
    try {
        const findPayment = await payment.findById(id)
        res.json({ success: true, data:  findPayment })
    } catch (error) {
        throw new Error(error)
    }
})
//get all payment history
const getAllPayment = asyncHandler(async(req, res) => {
    try {
        const getallpayment = await payment.find().populate(['customerId', 'plan'])
          
        res.json( getallpayment )
    } catch (error) {
           throw new Error(error)
    }
     
    })

const changeStatus = async (req, res) => {
    const { id,  status } = req.body;  
    try{
        let doc = await payment.findById(id);
        doc.status = status;
        await doc.save();

        const user = await User.findById(doc.customerId._id)
        if(user) {
            user.paymentStatus = status;
            await user.save()
        }

        res.status(200).json({ success: true, data: doc });
    } catch(error) {
        res.status(400).json({ success: false, error: error });

    }
};

// //update movie
// const updatePlan = asyncHandler(async(req, res) => {
//     const { id } = req.params
//     const { name,description,price, value} = req.body
//     try {
//         const doc = await Sub.findById(id)

//         if (name) doc.name = name
//         if (description) doc.description = description
//         if (price) doc.price = price
//         if (value) doc.value = value
     
//         await doc.save()
//         res.json({ success: true, data: doc })
//     } catch (error) {
//         res.json({ sucess: false, error: error })
//     }
// })
// //delete category
// const delete_plan = async(req, res) => {
// const { id } = req.params;
// try {
//     const deleting = await Sub.deleteOne({ _id: id });
//     res.json({ success: true, data: deleting });
// } catch (error) {
//     res.json({ success: false, error: error });
// }
// };
const getPaymentAnalysis = async (req, res) => {
    try {
        const totalPayment = await payment.countDocuments();
        res.json({ success: true, data: totalPayment });
    } catch (error) {
        res.json({ success: false, error: error });
    }
}
module.exports = {
    createPayment, 
    getaPayment,
    getAllPayment, 
    changeStatus,
    getPaymentAnalysis 
}