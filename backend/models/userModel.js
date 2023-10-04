import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    clerkUserId: { type: String, required: true },
    name: String,
    lastName: String,
    email: String,
    favoriteProducts: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
