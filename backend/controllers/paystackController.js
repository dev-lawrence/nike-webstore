import dotenv from 'dotenv';
import paystackOrder from '../models/paystackOrderModel.js';
import axios from 'axios';
import crypto from 'crypto';
dotenv.config();
const secret = process.env.PAYSTACK_SECRET_KEY;

// @desc Make Purchase
// @route POST /api/paystack/create-checkout-session
export const makePurchase = async (req, res) => {
  try {
    const { email, amount, userId, products } = req.body;

    const formattedProducts = products.map((product) => ({
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      image: product.image,
      size: product.size,
    }));

    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount: amount * 1000,
        metadata: {
          userId: userId,
          products: formattedProducts,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${secret}`,
        },
      }
    );

    const authorizationUrl = response.data.data.authorization_url;

    res.json({ authorizationUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// @desc Paystack Webhook
// @route POST /api/paystack/webhook
export const paystackWebhook = async (req, res) => {
  try {
    // Parse the request body as JSON
    const body = req.body.toString();
    const jsonData = JSON.parse(body);

    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
      .update(body, 'utf-8')
      .digest('hex');

    if (hash == req.headers['x-paystack-signature']) {
      const event = jsonData.event;

      // Handle different Paystack events based on the `event` field
      if (event === 'charge.success') {
        const newOrder = new paystackOrder({
          userId: jsonData.data.metadata.userId,
          reference: jsonData.data.reference,
          product: jsonData.data.metadata.products,
          total: jsonData.data.requested_amount,
          payment_status: jsonData.data.gateway_response,
        });

        await newOrder.save();

        res.status(200).send('Success');
        console.log('Order saved to database');
      } else {
        // Handle other Paystack events if needed
        console.log('Received Paystack event:', event);
        res.status(200).send('Event not handled');
      }
    } else {
      // Invalid signature, ignore the webhook event
      console.log('Invalid Paystack signature');
      res.status(400).send('Invalid signature');
    }
  } catch (error) {
    console.error('Error processing Paystack webhook:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// desc Get orders
// @route GET /api/paystack/orders
export const getOrders = async (req, res) => {
  try {
    const orders = await paystackOrder.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
};
