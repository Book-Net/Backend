const express = require("express");
const router = express.Router();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const {
  signupUser,
  loginUser,
  test,
  tokenVerify,
  getMe,
  editDetails,
  myBooks,
} = require("../controllers/authController");
const update_pro_img = require("../controllers/updateProfilePic");
const addBookAuthor = require("../controllers/addBookAuthor");
const add_book_sell = require("../controllers/addBookForSell");
const add_book_author = require("../controllers/Book_add_author");
const displayBookAuthor = require("../controllers/displayAuthorBooks");
const file_u = require("../controllers/file");
const stripeGW = require("../controllers/stripeGw");
const book_details = require("../controllers/bookSellDetails");
const bookDetailFetch = require("../controllers/bookDetailFetch");
const Bid = require("../controllers/Bid");
const ex = require("../controllers/ex");
const donate = require("../controllers/donate") 
// middleware
router.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/add_book", addBookAuthor);
router.get("/BookList", displayBookAuthor);
router.get("/give_file/:name", file_u);
router.post("/Book_add_author", add_book_author);
router.get("/bookDetailFetch/:isbn", bookDetailFetch);
router.post("/stripe/create-checkout-session", stripeGW);
router.get("/book_details/:id", book_details);
const { protect } = require("../helper/authmiddleware");

router.post("/signup", signupUser);
router.post("/test", protect, test);
router.post("/login", loginUser);
router.post("/add_book", protect, addBookAuthor);

router.get("/BookList", displayBookAuthor);
router.get("/give_file/:name", file_u);
router.post("/Book_add_author", add_book_author);
router.get("/bookDetailFetch/:isbn", bookDetailFetch);
router.post("/add_book_detail_sell", protect, add_book_sell);
router.post("/bid", protect, Bid);
router.post("/ex", protect, ex);
router.post("/donate", protect, donate);

// router.post("/add_book_detail_sell", add_book_sell);
router.get("/:id/verify/:token/", tokenVerify);
router.get("/me", protect, getMe);
router.post("/edit_details", protect, editDetails);
router.get("/MyBookList", protect, myBooks);
router.post("/update_pro_img", protect, update_pro_img);

module.exports = router;
