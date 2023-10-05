import Review from '../models/reviewModel.js';
import User from '../models/userModel.js';

// @desc Get Reviews for all Products
// @route GET /api/reviews/
export const getProductsReviews = async (req, res) => {
  try {
    const users = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorite products' });
  }
};

// @desc Get Reviews for a Product
// @route GET /api/reviews/:productId/review
export const getProductReviews = async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({ productId, approved: true });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product reviews', error });
  }
};

// @desc Add a Review to a Product
// @route POST /api/reviews/:productId/reviews
export const addProductReview = async (req, res) => {
  const { productId } = req.params;
  const { clerkUserId, userName, text, title, rating, approved } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ clerkUserId });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the user has already reviewed the specific product
    const alreadyReviewed = await Review.findOne({
      userId: clerkUserId,
      productId,
    });

    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ message: 'You have already reviewed this product.' });
    }
    // Proceed with adding the review
    const newReview = new Review({
      userId: clerkUserId,
      productId: productId,
      text: text,
      userName: userName,
      rating: rating,
      title: title,
      approved: approved,
    });

    await newReview.save();

    return res
      .status(201)
      .json({ message: 'Review added successfully', review: newReview });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error adding product review', error });
  }
};
