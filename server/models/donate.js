const mongoose = require("mongoose");

const donateSchema = new mongoose.Schema({
    u_id:String,
    req:String,
    book_id:String,
  // Add other fields as needed
});

const Donate = mongoose.model("Donate", donateSchema);
module.exports = Donate;
