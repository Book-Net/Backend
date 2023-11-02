const Donates = require("../models/donate")

const donatesDetails = async (req, res) => {
    try {
      const donatesData = await Donates.find();
      res.json(donatesData);
      console.log(donatesData);
    } catch (error) {
        
      console.error(error);
      res.status(500).json({ error: 'An error occurred in sales details coming' });
    }
  };

  module.exports = donatesDetails