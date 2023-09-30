const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  quatity: Number,
  authors: String,
  description: String,
  isbn: String,
  condition: String,
  price: String,
  img: String,
  location: String,
  minbid: String,
  starts: String,
  ends: String,
  needs:String,
  option:String,
  category:String,
  // Add other fields as needed
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;