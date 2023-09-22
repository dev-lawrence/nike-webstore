import { Webhook } from 'svix';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';

// @desc Save User
// @route POST /api/users
export const saveUser = async (req, res) => {
  try {
    const payloadString = req.body.toString();
    const svixHeaders = req.headers;

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
    const evt = wh.verify(payloadString, svixHeaders);
    const { data } = evt;

    // Handle the webhook
    const eventType = evt.type;
    if (eventType === 'user.created' || eventType === 'user.updated') {
      const firstEmailAddress =
        data.email_addresses && data.email_addresses[0]
          ? data.email_addresses[0].email_address
          : null;

      const firstName = data.first_name;
      const lastName = data.last_name;

      const existingUser = await User.findOne({ clerkUserId: data.id });

      if (existingUser) {
        // Update the existing user's information
        existingUser.name = firstName;
        existingUser.email = firstEmailAddress;
        existingUser.lastName = lastName;
        await existingUser.save();

        // Check if the product ID is provided in the request body
        if (data.product_id) {
          // Add the product ID to the user's favoriteProducts
          existingUser.favoriteProducts.push(data.product_id);
        }
        console.log(`User ${data.id} updated in the database`);
      } else {
        // Insert user data to database
        const user = new User({
          clerkUserId: data.id,
          name: firstName,
          lastName: lastName,
          email: firstEmailAddress,
          favoriteProducts: [],
        });

        await user.save();
        console.log('User saved to database');
      }
    }

    res.status(200).json({
      success: true,
      message: 'Webhook received',
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// @desc Save Product
// @route POST /api/user/:userId/favorites
export const saveProduct = async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    // Find the user by their ID
    const user = await User.findOne({ clerkUserId: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the product ID is already in the favorites
    if (!user.favoriteProducts.includes(productId)) {
      user.favoriteProducts.push(productId);
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: 'Product added to favorites',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding product to favorites',
    });
  }
};

// @desc Get Users
// @route GET /api/users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorite products' });
  }
};

// @desc Get Favorite Product
// @route GET /api/users/:userId/favorites
export const getFavoriteProduct = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ clerkUserId: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const favoriteProductIds = user.favoriteProducts;
    const favoriteProducts = await Product.find({
      _id: { $in: favoriteProductIds },
    });

    res.status(200).json(favoriteProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorite products' });
  }
};

// @desc Remove Favorite Product
// @route DELETE /api/users/:userId/favorites/:productId
export const removeProduct = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const user = await User.findOne({ clerkUserId: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const index = user.favoriteProducts.indexOf(productId);
    if (index !== -1) {
      // Remove the product ID from the user's favoriteProducts array
      user.favoriteProducts.splice(index, 1);
      await user.save();
      return res
        .status(200)
        .json({ message: 'Product removed from favorites' });
    } else {
      return res
        .status(404)
        .json({ message: 'Product not found in favorites' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error removing product from favorites' });
  }
};
