import { createContext } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
const CartContext = createContext();

export function CartProvider({ children }) {
  const [products, setProducts] = useLocalStorage('nike-webstore', []);

  // add to products cart
  const addToCart = (slug, name, price, image, size) => {
    const existingProduct = products.find((product) => product.slug === slug);
    if (existingProduct) {
      const updatedProducts = products.map((product) => {
        if (product.slug === slug) {
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
    }
  };

  // reduce the cart products
  const reduceCartQuantity = (slug) => {
    const updatedProducts = products.map((product) => {
      if (product.slug === slug) {
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

  return (
    <CartContext.Provider
      value={{ products, addToCart, reduceCartQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
