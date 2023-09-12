import express from 'express';
import data from '../data/data.js';
import Product from '../models/productModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  try {
    // Delete all previous records in the Product model
    await Product.deleteMany({});

    // Insert new products
    const createdProducts = await Product.insertMany(data.products);

    res.send({ createdProducts });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
});

export default seedRouter;
