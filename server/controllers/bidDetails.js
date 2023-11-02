const Bids = require("../models/biding");

const bidDetails = async (req, res) => {
  try {
    const bidsData = await Bids.find();
    res.json(bidsData);
    console.log(bidsData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred in sales details coming" });
  }
};

module.exports = bidDetails;
