const Stripe = require('stripe') 
require('dotenv').config()

const stripe = Stripe(process.env.STRIPE_KEY)

const stripeGw = async (req, res) => {

    const {book} = req.body;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {
          currency: 'usd',   
          product_data: {
            name: 'Book1',
          },   
          unit_amount: 500,
        },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3000/checkout-success`,
      cancel_url: `http://localhost:3000/cart`,
    });
  
    res.send({url: session.url});
  }; 

  module.exports = stripeGw;
  
