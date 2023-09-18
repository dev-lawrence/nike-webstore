import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';

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
app.use('/api/products', productRouter);

app.use('/api/user', userRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
