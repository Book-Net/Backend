const Donate = require("../models/donate");
const path = require("path");
const express = require("express");
const asyncHandler = require("express-async-handler");

const donate = asyncHandler(async (req, res) => {
    try {
        const user = req.user;
        const u_id = user._id.toString();
        // console.log(user._id.toString());
  
        let doData = {
            u_id: u_id,
            req: req.body.Request,
            book_id: req.body.book_id,
          };

        //   console.log("biddata " + bidData.u_id)
            
        Donate.create(doData)
        .then(res.status(200).json({ message: "The Book Added Successfully " }))
        .catch((err) =>
            res
            .status(500)
            .json({ message: "Error saving file to database", error: err })
        );

            
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "An error occurred while processing the request.",
      });
    }
  });
  module.exports = donate