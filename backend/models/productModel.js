import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    subName: { type: String },
    slug: { type: String, unique: true },
    category: { type: String },
    gender: { type: String },
    subcategory: { type: String },
    isHighlyRated: { type: Boolean },
    justIn: { type: Boolean },
    price: { type: Number },
    description: { type: String },
    color: { type: String },
    image: { type: String },
    sizes: [
      {
        value: { type: String },
      },
    ],
    mainImgs: [
      {
        img: { type: String },
      },
    ],
    thumbnailImgs: [
      {
        img: { type: String },
      },
    ],
    benefits: [
      {
        value: { type: String },
      },
    ],
  },

  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', ProductSchema);

export default Product;
