const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helper/auth");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// test
const test = asyncHandler(async (req, res) => {
  try {
    res.json({ message: "meka test ekak" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occurred while signing up." });
  }
});

// Signup user function
const signupUser = asyncHandler(async (req, res) => {
  try {
    const { userName, email, password, rePassword } = req.body;
    if (!userName || !email || !password || !rePassword) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long." });
    }

    if (password !== rePassword) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: user.email, id: user._id, name: user.userName },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    // Set the JWT token as an HTTP-only cookie
    res.cookie("token", token, { httpOnly: true });

    return res.json({
      _id: user.id,
      name: user.userName,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occurred while signing up." });
  }
});

// login user function
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "User not registered",
      });
    }

    // Check if password matches
    const match = await comparePassword(password, user.password);
    if (match) {
      const token = jwt.sign(
        { email: user.email, id: user._id, name: user.userName },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );

      // Set the JWT token as an HTTP-only cookie
      res.cookie("token", token, { httpOnly: true });

      return res.json({
        _id: user.id,
        name: user.userName,
        email: user.email,
      });
    } else {
      return res.json({
        error: "Password does not match!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "An error occurred while processing the request.",
    });
  }
});

module.exports = {
  signupUser,
  loginUser,
  test,
};
