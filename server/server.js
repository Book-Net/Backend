const express = require("express");
const { mongoose } = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();

const addBook = require("./controllers/addBookAuthor");

const app = express();


// middleware
app.use(express.json());
app.use(cors());

// database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("database connected"))
  .catch((err) => console.log("database not connected ", err));

const PORT = process.env.PORT || 9000;

app.use("/", require("./routes/authRoutes"));

// Book model and route setup
const Book = require("./models/Book"); // Assuming you have a Book model

app.post("/api/books", addBook);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
