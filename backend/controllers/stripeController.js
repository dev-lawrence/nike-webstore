import Stripe from 'stripe';
import dotenv from 'dotenv';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
dotenv.config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.ENDPOINT_SECRET_KEY;

// @desc Make Payment
// @route POST /api/stripe/create-checkout-session
export const makePayment = async (req, res) => {
  try {
    const { products, userId } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      // Handle the case where products is undefined or empty
      return res.status(400).json({ error: 'Invalid products data' });
    }

    const cartData = products.map((product) => ({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      image: product.image,
      size: product.size,
    }));

    const cartJson = JSON.stringify(cartData);

    const customer = await stripe.customers.create({
      metadata: {
        userId: userId,
        cart: cartJson,
      },
    });

    const lineItems = products.map((product) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${product.name} - Size: ${product.size}`,
            images: [product.image],
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'NG'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0,
              currency: 'usd',
            },
            display_name: 'Free shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 5,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 1500,
              currency: 'usd',
            },
            display_name: 'Next day air',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 1,
              },
              maximum: {
                unit: 'business_day',
                value: 1,
              },
            },
          },
        },
      ],

      phone_number_collection: {
        enabled: true,
      },
      customer: customer.id,
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/`,
    });

    res.send({ stripeSession: session });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc Create Order
const createOrder = async (customer, data) => {
  try {
    const products = JSON.parse(customer.metadata.cart);

    const productDetails = [];

    for (const product of products) {
      const productInfo = await Product.findOne({ name: product.name });
      productDetails.push({
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        image: productInfo.image,
        size: productInfo.sizes,
      });
    }

    const newOrder = new Order({
      userId: customer.metadata.userId,
      customerId: data.customer,
      paymentIntentId: data.payment_intent,
      product: productDetails,
      subtotal: data.amount_subtotal,
      total: data.amount_total,
      shipping: data.customer_details,
      payment_status: data.payment_status,
    });

    await newOrder.save();
    console.log('Order saved to database');
  } catch (err) {
    console.log(`Order Error: ${err.message}`);
  }
};

// desc Get orders
// @route GET /api/stripe/orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

// @desc Stripe Webhook
// @route POST /api/stripe/webhook
export const stripeWebHook = async (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;
  let data;
  let eventType;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    console.log('Webhook verified');
    eventType = event.type;
    data = event.data.object;
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  if (eventType === 'checkout.session.completed') {
    try {
      const customerId = data.customer;

      // Retrieve the customer's data from Stripe using the customerId
      const customer = await stripe.customers.retrieve(customerId);
      //   console.log('Customer Data:', customer);

      createOrder(customer, data);
    } catch (err) {
      console.log(`Event Error: ${err.message}`);
      return;
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send().end();
};
