const addBook = async (req, res) => {
  try {
                // const { title, author, genre } = req.body;

                // // Input validation
                // if (!title || !author || !genre) {
                // return res.status(400).json({ error: "Title, author, and genre are required fields." });
                // }

                // const newBook = await Book.create({ title, author, genre });
                // res.status(201).json(newBook);
    
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: error.message || "An error occurred" });
  }
}

module.exports = addBook