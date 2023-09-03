import express from 'express';
import data from './data/data.js';
import cors from 'cors';

const app = express();

// Enable CORS for all routes
app.use(cors());

// get all products
app.get('/api/products', (req, res) => {
  res.send(data.products);
});

// get a product
app.get('/api/products/slug/:slug', (req, res) => {
  const product = data.products.find((p) => p.slug === req.params.slug);
  res.send(product);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
