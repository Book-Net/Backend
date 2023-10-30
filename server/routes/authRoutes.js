const express = require("express");
const router = express.Router();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const {
  signupUser,
  loginUser,
  test,
} = require("../controllers/authController");
const addBookAuthor = require("../controllers/addBookAuthor");
const add_book_sell = require("../controllers/addBookForSell");
const add_book_author = require("../controllers/Book_add_author");
const displayBookAuthor = require("../controllers/displayAuthorBooks");
const file_u = require("../controllers/file");
const bookDetailFetch = require("../controllers/bookDetailFetch");
// middleware
router.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const { protect } = require("../helper/authmiddleware");

router.post("/signup", signupUser);
router.post("/test", protect, test);
router.post("/login", loginUser);
router.post("/add_book", protect, addBookAuthor);
router.post("/add_book_detail_sell", add_book_sell);

router.get("/BookList", displayBookAuthor);
router.get("/give_file/:name", file_u);
router.post("/Book_add_author", add_book_author);
router.get("/bookDetailFetch/:isbn", bookDetailFetch);
router.post("/add_book_detail_sell", add_book_sell);

module.exports = router;
