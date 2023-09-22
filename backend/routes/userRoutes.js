import express from 'express';
import bodyParser from 'body-parser';
import {
  saveUser,
  saveProduct,
  getUsers,
  getFavoriteProduct,
  removeProduct,
} from '../controllers/userController.js';
const userRouter = express.Router();

// Middleware to parse JSON payloads for the favorites route
const jsonParserForFavorites = express.json();

userRouter.post('/', bodyParser.raw({ type: 'application/json' }), saveUser);

// Save product to favorites
userRouter.post('/:userId/favorites', jsonParserForFavorites, saveProduct);

// get all users
userRouter.get('/', getUsers);

//  get favorite products by IDs
userRouter.get('/:userId/favorites', getFavoriteProduct);

// remove a product from favorites
userRouter.delete('/:userId/favorites/:productId', removeProduct);

export default userRouter;
