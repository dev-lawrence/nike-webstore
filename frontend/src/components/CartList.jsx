import EmptyCart from './EmptyCart';
import CartContext from '../CartContext';
import { useContext } from 'react';
import CartItem from './CartItem';
import PayButton from './PayButton';

const CartList = ({ cartClick, handleCartClick }) => {
  const { products } = useContext(CartContext);
  const cartNotEmpty = Array.isArray(products) && products.length !== 0;

  const calculateSubTotal = () => {
    let subtotal = 0;

    products.forEach((product) => {
      subtotal += product.quantity * product.price;
    });

    return subtotal.toFixed(2);
  };

  return (
    <>
      <div className={`cart-container ${cartClick ? 'showCart' : ''}`}>
        <div className="cart">
          <button className="close" onClick={handleCartClick}>
            <span>Back to store 🛒</span>
          </button>

          <div className="content">
            <div className="cart-products">
              {cartNotEmpty ? (
                products.map((product) => (
                  <CartItem key={product.slug} product={product} />
                ))
              ) : (
                <EmptyCart handleCartClose={handleCartClick} />
              )}
            </div>
          </div>

          {cartNotEmpty && (
            <div className="subtotal-container">
              <div className="subtotal">
                <span>Subtotal: ${calculateSubTotal()}</span>
              </div>

              <PayButton products={products} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartList;
