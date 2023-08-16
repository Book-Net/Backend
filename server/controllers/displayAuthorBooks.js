const Book = require("../models/Book")

const viewBook = async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (error) {
        
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  };

  module.exports = viewBook