import express from 'express';
import data from './data/data.js';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use('/api/seed', seedRouter);

// get all products
// app.get('/api/products', (req, res) => {
//   res.send(data.products);
// });
app.use('/api/products', productRouter);

// get single product
// app.get('/api/products/slug/:slug', (req, res) => {
//   const product = data.products.find((p) => p.slug === req.params.slug);

//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ message: 'Product not found' });
//   }
// });

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
