import mongoose from 'mongoose';

const paystackOrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    reference: { type: String },
    product: [
      {
        name: { type: String },
        price: { type: String },
        quantity: { type: String },
        image: { type: String },
        size: { type: String },
      },
    ],
    total: { type: Number, required: true },
    delivery_status: { type: String, default: 'pending' },
    payment_status: { type: String, required: true },
  },
  { timestamps: true }
);

const paystackOrder = mongoose.model('PaystackOrder', paystackOrderSchema);

export default paystackOrder;

// paystackOrder.collection.drop((error) => {
//   if (error) {
//     console.error('Error dropping reviews collection:', error);
//   } else {
//     console.log('PaystackOrder collection dropped successfully.');
//   }
// });
