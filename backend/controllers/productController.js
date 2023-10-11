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

// @desc Search Product
// @route GET /api/products/search/:query
export const searchProduct = async (req, res) => {
  try {
    const { query } = req.params;

    const searchResults = await Product.find({
      $or: [
        { name: { $regex: new RegExp(query, 'i') } },
        { subName: { $regex: new RegExp(query, 'i') } },
        { category: { $regex: new RegExp(query, 'i') } },
        { subcategory: { $regex: new RegExp(query, 'i') } },
        { description: { $regex: new RegExp(query, 'i') } },
      ],
    });

    res.status(200).json(searchResults);
  } catch (error) {
    console.error('Error searching for products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
