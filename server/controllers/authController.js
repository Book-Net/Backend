const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helper/auth");
const jwt = require("jsonwebtoken");

// signup user function
const signupUser = async (req, res) => {
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
    // check email
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({ error: "Email already registered" });
    }

    const hashedPassword = await hashPassword(password);

    // create user in database
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occurred while signing up." });
  }
};

// login user function

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "User not registered",
      });
    }

    // check password match
    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.userName },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    }
    if (!match) {
      res.json({
        error: "Password not match!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signupUser,
  loginUser,
};
