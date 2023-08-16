const Book = require("../models/book")

const addBook = async (req, res) => {
  try {
                const { title, description, isbn, quantity, price, img } = req.body;

                // Input validation
                if (!title || !description || !isbn || !quantity || !price || !img) {
                return res.status(400).json({ error: "All are required fields." });
                }

                const newBook = await Book.create({ title, description, isbn, quantity, price, img });
                res.status(201).json(newBook);
    
  } catch (error) {
    console.error("Error"+ error); // Log the error for debugging
    res.status(500).json({ error: error.message || "An error occurred" });
  }
}

module.exports = addBook