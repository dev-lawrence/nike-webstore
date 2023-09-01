import express from 'express';
import data from './data/data.js';
import cors from 'cors';

const app = express();

// Enable CORS for all routes
app.use(cors());

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
