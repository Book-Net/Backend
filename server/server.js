const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const path = require("path");

// const addBook = require("./controllers/addBookAuthor");

const app = express();

// Enable CORS for all routes
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend URL
  credentials: true,
};

app.use(cors(corsOptions));

// Set CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Change this to the actual origin of your client
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

<<<<<<<<< Temporary merge branch 1


app.use('/src/img', express.static('src'));
app.use(express.static(path.join(__dirname, 'src/img')));

// database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("database connected"))
  .catch((err) => console.log("database not connected ", err));

const PORT = process.env.PORT || 9000;


app.use("/", require("./routes/authRoutes"));
app.use("/goals", require("./routes/goalRoutes"));

// Book model and route setup
// const Book = require("./models/book"); // Assuming you have a Book model

// app.post("/api/books", addBook);




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
