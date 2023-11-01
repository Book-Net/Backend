const Biding = require("../models/biding");
const path = require("path");
const express = require("express");
const asyncHandler = require("express-async-handler");
const Book = require("../models/Book");

const Bid = asyncHandler(async (req, res) => {
    try {
        const user = req.user;
        const u_id = user._id.toString();
        console.log(user._id.toString());
        console.log(req);
  
        let bidData = {
            u_id: u_id,
            bid_amount: req.body.bidAmount,
            book_id: req.body.book_id,
          };

        //   console.log("biddata " + bidData.u_id)
            Book.findOneAndUpdate(
            { _id: bidData.book_id }, // Match the book by its ID
            { $set: { minbid: bidData.bid_amount } }, // Update the minbid field
            { new: true } // Return the updated document
          )
            .then((updatedBook) => {
              if (updatedBook) {
                Biding.create(bidData)
                    .then(res.status(200).json({ message: "The Book Added Successfully " }))
                    .catch((err) =>
                        res
                        .status(500)
                        .json({ message: "Error saving file to database", error: err })
                    );
              } else {
                res.status(404).json({ message: "Book not found" });
              }
            })
            .catch((err) => {
              res.status(500).json({ message: "Error updating book", error: err });
            });

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "An error occurred while processing the request.",
      });
    }
  });
  module.exports = Bid