const Stripe = require("stripe");
require("dotenv").config();
const Order = require("../models/order");
const Book = require("../models/Book");

const stripe = Stripe(process.env.STRIPE_KEY);

const stripeGw = async (req, res) => {
  console.log("Req- body", req.body);
  console.log("Req- body price type", typeof req.body.price);
  const cartItem = req.body.cartItems;
  const priceItem = Number(req.body.price) * 100 * 1.05;

  const line_items01 = () => {
    return [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {
          currency: "lkr",
          product_data: {
            name: cartItem,
          },
          unit_amount: priceItem,
        },
        quantity: 1,
      },
    ];
  };

  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      item: cartItem,
    },
  });

  console.log(req.body.userId);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["CA", "US", "SL"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 50000,
            currency: "lkr",
          },
          display_name: "Shipping + 5% on each transaction",
          // delivery_estimate: {
          //   minimum: {
          //     unit: "business_day",
          //     value: 1,
          //   },
          //   maximum: {
          //     unit: "business_day",
          //     value: 1,
          //   },
          // },
        },
      },
    ],
    // phone_number_collections:{
    //   enabled: true
    // },
    customer: customer.id,
    line_items: line_items01(req),
    mode: "payment",
    success_url: `http://localhost:3000/checkout-success`,
    cancel_url: `http://localhost:3000/`,
  });

  res.send({ url: session.url });
};

//create Order
const createOrder = async (customer, data) => {
  // const items = JSON.parse("Book1")
  const items = customer.metadata.item;

  Order.create({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products: items,
    total: data.amount_total / 100,
    payment_status: data.payment_status,
    shipping_address: data.customer_details,
  })
    .then((newOrder) => {
      console.log("Order created successfully:", newOrder);
      // data.status(201).json({ message: 'Order created successfully', order: newOrder });
    })
    .catch((error) => {
      console.error("Error creating order:", error);
      // data.status(500).json({ error: 'An error occurred while creating the order' });
    });

  // const newOrder = new Order({
  //   userId: customer.metadata.userId,
  //   customerId: data.customer,
  //   paymentIntentId: data.payment_intent,
  //   products: items,
  //   total: data.amount_total,
  //   payment_status: data.payment_status
  // })

  // try {
  //   const saveOrder =  await newOrder.save()
  //   console.log("Processed Order : " , saveOrder)
  // } catch (error) {

  // }
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

  console.log("req: ", req.body.data);

  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = req.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      );
      console.log("Webhook verified");
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }

    data = req.data.object;
    eventType = event.type;
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }

  console.log("Data customer: " + data.customer);
  console.log("EventType : " + eventType);

  // Handle the event
  if (eventType === "checkout.session.completed") {
    if (!data.customer) {
      console.log("Error: Customer ID is missing or invalid.");
      return res.sendStatus(400);
    }

    // Ensure data.customer is a valid customer ID

    const customerID = data.customer;

    stripe.customers
      .retrieve(customerID)
      .then((customer) => {
        console.log("Customer found : ", customer);
        console.log("data : ", data);
        createOrder(customer, data);
      })
      .catch((err) => {
        console.log("Error in customer ", err);
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
  res.send().end();
};

module.exports = { stripeGw, stripeWebHook };
