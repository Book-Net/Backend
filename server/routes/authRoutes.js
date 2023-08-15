const express = require("express");
const router = express.Router();
const cors = require("cors");
const { test, signupUser } = require("../controllers/authController");
const testk = require("../controllers/test");
const multer = require('multer');
const path = require('path');

// middleware
router.use(
  cors({
    origin: "http://localhost:3000",
  })
);

router.get("/", test);
router.post("/signup", signupUser);
router.post("/upload", testk);

module.exports = router;
