import express from 'express';
import cors from 'cors';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import stripeRouter from './routes/stripeRoutes.js';

dotenv.config();

connectDB();

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use('/api/seed', seedRouter);

// get all products
app.use('/api/products', productRouter);

// save user to database
app.use('/api/users', userRouter);

// make payments
app.use('/api/stripe/', stripeRouter);

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
