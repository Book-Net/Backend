const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();

// Enable CORS for all routes
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend URL
  credentials: true,
};

app.use(cors(corsOptions));

// Set CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, POST, PATCH, DELETE, GET, OPTIONS"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("database connected"))
  .catch((err) => console.log("database not connected ", err));

const PORT = process.env.PORT || 9000;

app.use("/", require("./routes/authRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
