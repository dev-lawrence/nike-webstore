import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: 'User',
      required: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },

    text: { type: String, required: true },
    rating: { type: Number, required: true },
    approved: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;
