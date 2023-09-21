import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.blue.underline);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

export default connectDB;
