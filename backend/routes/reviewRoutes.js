import express from 'express';

import {
  addProductReview,
  getProductReviews,
  getProductsReviews,
} from '../controllers/reviewController.js';
const reviewRouter = express.Router();

// Middleware to parse JSON payloads for the favorites route
const jsonParserForFavorites = express.json();

// get all reviews
reviewRouter.get('/', getProductsReviews);

// get user reviews
reviewRouter.get('/:productId/reviews', getProductReviews);

// Add reviews to database
reviewRouter.post(
  '/:productId/reviews',
  jsonParserForFavorites,
  addProductReview
);

export default reviewRouter;
