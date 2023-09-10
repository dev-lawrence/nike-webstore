import { useState, useContext, useEffect } from 'react';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CartContext from '../CartContext';

const CartItem = ({ product }) => {
  const { slug, name, price, image } = product;
  const { products, addToCart, reduceCartQuantity, removeFromCart } =
    useContext(CartContext);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const cartProduct = products.find((product) => product.slug === slug);
    if (cartProduct) {
      setQuantity(cartProduct.quantity);
    }
  }, [products, slug]);

  // Function to Increase Quantity
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    addToCart(slug, image, name, price);
  };

  // Function to Reduce Quantity
  const reduceQuantity = () => {
    if (quantity > 1) {
      reduceCartQuantity(slug);
      setQuantity((prevQuantity) => prevQuantity - 1);
    } else {
      removeFromCart(slug);
    }
  };

  // calculate the price
  const calculatePrice = (quantity, price) => {
    return quantity * price;
  };

  return (
    <>
      <div className="cart-products-product">
        <img src={image} alt={name} />
        <div className="cart-product-details">
          <h5 className="name">{name}</h5>
          <h4 className="price">${calculatePrice(quantity, price)}</h4>
          <div className="buttons">
            <button
              onClick={() => {
                reduceQuantity();
              }}
            >
              -
            </button>
            <span>{quantity}</span>
            <button onClick={increaseQuantity}>+</button>
          </div>
          <div onClick={() => removeFromCart(slug)}>
            <DeleteRoundedIcon className="delete" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;