const asyncHandler = require("express-async-handler");

const Goal = require("../models/testmodel");

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});

const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text");
  }
  const goals = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goals);
});

const deleteGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();

  res.status(200).json(goals);
});
const updateGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();

  res.status(200).json(goals);
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
