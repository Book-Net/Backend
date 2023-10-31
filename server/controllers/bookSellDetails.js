const Book = require("../models/Book")

const bookSellDetails = async (req, res) => {
    
    const id = req.params.id

    try {
      const books = await Book.findById(id);
      res.json(books);
    } catch (error) {
      
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  };

  module.exports = bookSellDetails;