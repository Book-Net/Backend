const Sales = require("../models/order")

const salesDetails = async (req, res) => {
    try {
      const salesData = await Sales.find();
      res.json(salesData);
      console.log(salesData);
    } catch (error) {
        
      console.error(error);
      res.status(500).json({ error: 'An error occurred in sales details coming' });
    }
  };

  module.exports = salesDetails