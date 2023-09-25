import express from 'express';
import {
  getProducts,
  getProduct,
  searchProduct,
} from '../controllers/productController.js';

const productRouter = express.Router();

// get all products
productRouter.get('/', getProducts);

// get single product
productRouter.get('/slug/:slug', getProduct);

// search for product
productRouter.get('/search/:query', searchProduct);

export default productRouter;
