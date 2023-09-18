import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkUserId: { type: String, unique: true },
  //   clerkUserId: { type: String, required: true, unique: true },
  name: String,
  lastName: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

export default User;
