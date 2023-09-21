import Product from '../models/productModel.js';

// @desc Get Products
// @route GET /api/products
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.send(products);
};

// @desc Get Product
// @route GET /api/products/slug/:slug
export const getProduct = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
};
