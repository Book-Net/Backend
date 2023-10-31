const Stripe = require('stripe') 
require('dotenv').config()

const stripe = Stripe(process.env.STRIPE_KEY)

const stripeGw = async (req, res) => {

    const {book} = req.body;
    console.log(book)
    const session = await stripe.checkout.sessions.create({
      // payment_method_types: ['card'],
      // shipping_address_collection:{
      //   allowed_countries:['CA', 'US'],
      // },
      // shipping_options: [
      //   {
      //     shipping_rate_data: {
      //       type: 'fixed_amount',
      //       fixed_amount:{
      //         amount: 0,
      //         currency: 'usd',
      //       },
      //       display_name: 'Free Shipping',
      //       delivery_estimate:{
      //         minimum:{
      //           unit: 'business_day',
      //           value: 1,
      //         },
      //         maximum: {
      //           unit: 'business_day',
      //           value: 1
      //         },
      //       }
      //     }
      //   },
      // ],
      // phone_number_collections:{
      //   enabled: true
      // },
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {
          currency: 'lkr',   
          product_data: {
            name: 'Book1',
          },   
          unit_amount: 500000,
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
  
