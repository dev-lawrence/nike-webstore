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

    const searchWords = query.split(' ');

    const searchResults = await Product.find({
      $or: searchWords.map((word) => ({
        $or: [
          { name: { $regex: new RegExp(word, 'i') } },
          { category: { $regex: new RegExp(word, 'i') } },
          { subcategory: { $regex: new RegExp(word, 'i') } },
          // { description: { $regex: new RegExp(word, 'i') } },
        ],
      })),
    });

    if (searchResults.length === 0) {
      return res.status(404).json({ message: 'No products found.' });
    }
    res.status(200).json(searchResults);
  } catch (error) {
    console.error('Error searching for products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
