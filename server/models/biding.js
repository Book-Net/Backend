const mongoose = require("mongoose");

const bidingSchema = new mongoose.Schema({
    u_id:String,
    bid_amount:String,
    book_id:String,
  // Add other fields as needed
});

const Bid = mongoose.model("Biding", bidingSchema);
module.exports = Bid;
