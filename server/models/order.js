const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
   customerId: {
      type: String,
      
    },
   paymentIntentId: {
      type: String,
      
    },
    products: {
      type:  String,
      unique: true,
    },
    total: {
      type: Number,
      required: true,
    },
    payment_status:{
        type: String,
        required: true
    }
  },
   {timestamps: true});

   const orderModel = mongoose.model("Order", orderSchema)

   module.exports = orderModel;
