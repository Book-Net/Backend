const mongoose = require("mongoose");

const exSchema = new mongoose.Schema({
    u_id:String,
    needs:String,
    book_id:String,
  // Add other fields as needed
});

const Exchange = mongoose.model("Exchange", exSchema);
module.exports = Exchange;
