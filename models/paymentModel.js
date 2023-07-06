const mongoose = require('mongoose')
const paymentSchema = mongoose.Schema({

    customerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
    },
    payment_type: {
        type: String,
        required:true,
        unique: true
    },
    payment_method: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscription",
        required: true,
    }, 
    checkoutType: {
        type: String,
        default: 'Subscription'
      },
    status: {
        type: String,
        default: 'pending'
      }


}, {
    timestamps: true
})

const payment = mongoose.model('payment',paymentSchema)
module.exports = payment