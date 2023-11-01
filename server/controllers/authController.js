const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helper/auth");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const { error } = require("console");
const Book = require("../models/Book");

// test
const test = asyncHandler(async (req, res) => {
  try {
    res.json({ message: "meka test ekak" });
    console.log(req.user._id.toString());
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occurred in the test function." });
  }
});

const getMe = asyncHandler(async (req, res) => {
  try {
    console.log("object");
    const user = req.user;
    const u_id = user._id.toString();

    const foundUser = await User.findById(u_id);

    if (foundUser) {
      // console.log("User details:", foundUser);
      return res.json({ user: foundUser });
    } else {
      // console.log("User not found");
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occurred in the test function." });
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

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
    await sendEmail(user.email, "Verify Your Email", url);
    res
      .status(201)
      .send({ message: "An Email sent to your account please verify" });

    // return res.json({
    //   _id: user.id,
    //   name: user.userName,
    //   email: user.email,
    // });
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

    // if (!user.verified) {
    //   let token = await Token.findOne({ userId: user._id });
    //   if (!token) {
    //     token = await new Token({
    //       userId: user._id,
    //       token: crypto.randomBytes(32).toString("hex"),
    //     }).save();
    //     const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
    //     await sendEmail(user.email, "Verify Email", url);
    //   }

    //   return res
    //     .status(400)
    //     .send({ message: "An Email sent to your account please verify" });
    // }

    // Check if password matches
    const match = await comparePassword(password, user.password);
    if (match) {
      const token = jwt.sign(
        { email: user.email, id: user._id, name: user.userName },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      // Set the JWT token as an HTTP-only cookie
      // res.cookie("token", token, { httpOnly: true });

      return res.json({
        token: token,
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

const editDetails = asyncHandler(async (req, res) => {
  try {
    const { name, phone, address, country } = req.body;
    const user = req.user;
    const u_id = user._id.toString();

    // Check if the user exists
    const findUser = await User.findOne({ _id: u_id });

    if (!findUser) {
      return res.json({
        error: "User not exist!",
      });
    }

    // Update the user's details
    try {
      const updateFields = {};

      if (name) {
        updateFields.userName = name;
      }
      if (phone) {
        updateFields.phone = phone;
      }
      if (address) {
        updateFields.address = address;
      }
      if (country) {
        updateFields.country = country;
      }

      const updatedUser = await User.findByIdAndUpdate(u_id, updateFields, {
        new: true,
      });

      return res.json({
        message: "User details updated successfully!",
        user: updatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        error: "An error occurred while updating user details.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "An error occurred while processing the request.",
    });
  }
});

const tokenVerify = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    await User.findByIdAndUpdate(req.params.id, {
      verified: true,
    });

    return res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const myBooks = async (req, res) => {
  try {
    const user = req.user;
    const u_id = user._id.toString();
    const books = await Book.find({ user_id: u_id });

    console.log("hariiiiiiiiiiiiiiiiiii");
    console.log(books);

    if (books) {
      console.log("User books:", books);
      return res.json({ books: books });
    } else {
      console.log("User not found");
      res.status(404).json({ error: "books not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  signupUser,
  loginUser,
  test,
  tokenVerify,
  getMe,
  editDetails,
  myBooks,
};
