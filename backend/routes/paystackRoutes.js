import express from 'express';
import {
  makePurchase,
  paystackWebhook,
  getOrders,
} from '../controllers/paystackController.js';

const paystackRouter = express.Router();

// // Middleware to parse JSON payloads for the favorites route
const jsonParserForProducts = express.json();

paystackRouter.post(
  '/create-checkout-session',
  jsonParserForProducts,
  makePurchase
);

paystackRouter.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  paystackWebhook
);

paystackRouter.get('/orders', jsonParserForProducts, getOrders);

export default paystackRouter;
