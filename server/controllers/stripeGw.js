const Stripe = require('stripe') 
require('dotenv').config()

const stripe = Stripe(process.env.STRIPE_KEY)

const stripeGw = async (req, res) => {
  console.log("Req- body",req.body)
  console.log("Req- body price type",typeof(req.body.price))
  const cartItem = req.body.cartItems
  const priceItem = Number(req.body.price)*100
    
  const line_items01 = () =>{
      return (
              [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price_data: {
            currency: 'lkr',   
            product_data: {
              name: cartItem,
            },   
            unit_amount: priceItem,
          },
            quantity: 1,
          },
        ])
      }


    const customer = await stripe.customers.create({
      metadata:{
        userId: req.body.userId,
      }
    })

    console.log(req.body.userId)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
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
      customer: customer.data, 
      line_items: line_items01(req),
      mode: 'payment',
      success_url: `http://localhost:3000/checkout-success`,
      cancel_url: `http://localhost:3000/cart`,
    });
    
    res.send({url: session.url});
  }; 

  //Stripe Webhooks
  let endpointSecret;
// const endpointSecret = 'whsec_36df203ec086f05b6bd19e0b9a34578ffb0808afedf7ef18f9d04af3e00b736d';


const stripeWebHook = (req, res) => {
  let event = req.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  let data;
  let eventType;

  console.log("req: " , req.body.data)

  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = req.headers['stripe-signature'];


    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      );
      console.log("Webhook verified")
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }

    data = event.data.object;
    eventType = event.type;
  }else{
    data = req.body.data.object;
    eventType = req.body.type;
  }

  console.log("Data customer: " + data.customer)
  console.log("EventType : " + eventType)

  // Handle the event
  if (eventType === 'checkout.session.completed') {
    if (!data.customer) {
      console.log("Error: Customer ID is missing or invalid.");
      return res.sendStatus(400);
    }
  
    // Ensure data.customer is a valid customer ID
    
    const customerID = data.customer;
  
    stripe.customers.retrieve(customerID)
      .then((customer) => {
        if (customer) {
          console.log(customer);
          console.log("data:", data);
        } else {
          console.log("Customer not found.");
        }
      }).catch((err) => {
        console.log("Error retrieving customer:", err.message);
      });
  }


  // switch (event.type) {
  //   case 'payment_intent.succeeded':
  //     const paymentIntent = event.data.object;
  //     console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
  //     // Then define and call a method to handle the successful payment intent.
  //     // handlePaymentIntentSucceeded(paymentIntent);
  //     break;
  //   case 'payment_method.attached':
  //     const paymentMethod = event.data.object;
  //     // Then define and call a method to handle the successful attachment of a PaymentMethod.
  //     // handlePaymentMethodAttached(paymentMethod);
  //     break;
  //   default:
  //     // Unexpected event type
  //     console.log(`Unhandled event type ${event.type}.`);
  // }

  // Return a 200 response to acknowledge receipt of the event
  res.send().end()
};


  module.exports = {stripeGw, stripeWebHook};
  
