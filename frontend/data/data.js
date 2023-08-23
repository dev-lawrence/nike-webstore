const products = [
  {
    category: 'Men',
    subcategories: [
      {
        name: 'Clothing',
        products: [
          {
            title: "Men's Nike Dri-FIT T-Shirt",
            description: 'Moisture-wicking athletic shirt for men',
            price: 29.99,
            images: ['image1.jpg', 'image2.jpg'],
            isNew: false,
            isFeatured: true,
            thumbnailImages: ['thumbnail1.jpg'],
            isJustIn: false,
            isBestseller: true,
          },
          {
            // Add more men's clothing products here
          },
        ],
      },
      {
        name: 'Shoes',
        products: [
          {
            title: "Men's Nike Air Max 270",
            description: 'Stylish and comfortable sneakers for men',
            price: 129.99,
            images: ['image5.jpg', 'image6.jpg'],
            isNew: true,
            isFeatured: true,
            thumbnailImages: ['thumbnail3.jpg'],
            isJustIn: true,
            isBestseller: false,
          },
          {
            // Add more men's shoe products here
          },
        ],
      },
      {
        name: 'Accessories',
        products: [
          {
            title: "Men's Nike Classic Baseball Cap",
            description: 'Stylish cap for men',
            price: 19.99,
            images: ['image9.jpg'],
            isNew: false,
            isFeatured: true,
            thumbnailImages: ['thumbnail5.jpg'],
            isJustIn: false,
            isBestseller: true,
          },
          {
            // Add more men's accessory products here
          },
        ],
      },
    ],
  },
  // Repeat the above structure for Women and Kids categories
  {
    category: 'Women',
    // ...
  },
  {
    category: 'Kids',
    // ...
  },
];

// Example usage:
console.log(products);
