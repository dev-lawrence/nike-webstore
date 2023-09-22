import { useContext, createContext, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
const CartContext = createContext();
import NotificationContext from './NotificationContext';

export function CartProvider({ children }) {
  const [products, setProducts] = useLocalStorage('nike-webstore', []);
  // const [favorites, setFavorites] = useState([]);
  const { showNotify } = useContext(NotificationContext);

  // add to products cart
  const addToCart = (slug, name, price, image, size) => {
    const existingProduct = products.find((product) => product.slug === slug);
    if (existingProduct) {
      const updatedProducts = products.map((product) => {
        if (product.slug === slug) {
          showNotify(`Increased ${name} quantity`);
          return { ...product, quantity: product.quantity + 1, size };
        }

        return product;
      });

      setProducts(updatedProducts);
    } else {
      setProducts((prevProducts) => [
        ...prevProducts,
        { slug, name, price, image, size, quantity: 1 },
      ]);

      showNotify(`${name} added to your cart`);
    }
  };

  // reduce the cart products
  const reduceCartQuantity = (slug) => {
    const updatedProducts = products.map((product) => {
      if (product.slug === slug) {
        showNotify(`Reduced ${product.name} quantity`);
        const updatedQuantity = product.quantity - 1;
        if (updatedQuantity < 1) {
          removeFromCart(slug);
        }
        return { ...product, quantity: updatedQuantity };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  // remove products from cart
  const removeFromCart = (slug) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.slug !== slug)
    );
  };

  // Function to add a product to favorites
  // const addToFavorites = (slug, name, subName, price, image) => {
  //   const existingProduct = favorites.find((product) => product.slug === slug);
  //   if (existingProduct) {
  //     const updatedProducts = favorites.map((product) => {
  //       if (product.slug === slug) {
  //         showNotify('Already in Favorites');
  //         return { ...product };
  //       }

  //       return product;
  //     });

  //     setFavorites(updatedProducts);
  //   } else {
  //     setFavorites((prevProducts) => [
  //       ...prevProducts,
  //       { slug, name, subName, price, image },
  //     ]);

  //     showNotify('Added to Favorites');
  //   }
  // };

  // const removeFromFavorites = (slug) => {
  //   setFavorites((prevFavorites) =>
  //     prevFavorites.filter((product) => product.slug !== slug)
  //   );
  // };

  // reset cart to zero on success page
  const resetCart = () => {
    setProducts([]);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addToCart,
        reduceCartQuantity,
        removeFromCart,
        // addToFavorites,
        // removeFromFavorites,
        // favorites,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
