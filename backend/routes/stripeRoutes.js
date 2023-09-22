import express from 'express';
import {
  makePayment,
  stripeWebHook,
  getOrders,
} from '../controllers/stripeController.js';

const stripeRouter = express.Router();

// Middleware to parse JSON payloads for the favorites route
const jsonParserForProducts = express.json();

stripeRouter.post(
  '/create-checkout-session',
  jsonParserForProducts,
  makePayment
);

stripeRouter.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  stripeWebHook
);

stripeRouter.get('/orders', jsonParserForProducts, getOrders);

export default stripeRouter;
