import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkUserId: { type: String, unique: true, required: true },
  name: String,
  lastName: String,
  email: String,
  favoriteProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

const User = mongoose.model('User', userSchema);

export default User;
