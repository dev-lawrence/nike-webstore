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
    userName: { type: String, required: true },
    rating: { type: Number, required: true },
    title: { type: String, required: true },
    approved: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

// Drop the reviews collection
// Review.collection.drop((error) => {
//   if (error) {
//     console.error('Error dropping reviews collection:', error);
//   } else {
//     console.log('Reviews collection dropped successfully.');
//   }
// });

export default Review;
