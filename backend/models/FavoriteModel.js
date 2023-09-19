import mongoose from 'mongoose';

// Define the Favorite schema
const FavoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
});

const Favorite = mongoose.model('Favorite', FavoriteSchema);

export default Favorite;

// const FavoriteSchema = new mongoose.Schema({
//   clerkUserId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//     unique: true,
//   },

//   productId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product',
//     required: true,
//   },

//   slug: String,
//   name: String,
//   subName: String,
//   price: Number,
//   image: String,
// });
