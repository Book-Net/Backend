const path = require('path');
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const give_user = asyncHandler(async (req, res) => {
    try {
        const user = req.user;
        const u_id = user._id.toString();
        console.log(user._id.toString());
        
        const user_id = req.params.id;
        console.log("mnn wadaaaaaaaaaaaaaa "+user_id);
        

        //   console.log("biddata " + bidData.u_id)
        
        
            const foundUser = await User.findById(user_id);
            // console.log(foundUser)
            if (foundUser) {
              // console.log("User details:", foundUser);
              return res.json({ user: foundUser });
            } else {
              // console.log("User not found");
              res.status(404).json({ error: "User not found" });
            }
          

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "An error occurred while processing the request.",
      });
    }
  });


  module.exports = give_user;