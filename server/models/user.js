const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
      default: "",
    },
    userType: {
      type: String,
      default: "Normal User",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
