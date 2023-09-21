import express from 'express';
import { getProducts, getProduct } from '../controllers/productController.js';

const productRouter = express.Router();

// get all products
productRouter.get('/', getProducts);

// get single product
productRouter.get('/slug/:slug', getProduct);

export default productRouter;
