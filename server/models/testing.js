const mongoose = require('mongoose');

const imgSchm = new mongoose.Schema({
    file: String
})

const imgmdl=mongoose.model("image",imgSchm);
module.exports = imgmdl;