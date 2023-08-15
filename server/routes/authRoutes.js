const express = require("express");
const router = express.Router();
const cors = require("cors");
const { test, signupUser } = require("../controllers/authController");
const testk = require("../controllers/test");
const multer = require('multer');
const path = require('path');
const { signupUser, loginUser } = require("../controllers/authController");
const addBookAuthor = require("../controllers/addBookAuthor");

// middleware
router.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

router.post("/signup", signupUser);
router.post("/upload", testk);
router.post("/login", loginUser);
router.post("/add_book",addBookAuthor);

module.exports = router;
