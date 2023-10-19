import { useContext, useEffect } from 'react';
import CartContext from '../CartContext';
import CheckoutImg from '../assets/checkout-image.png';
import { Link } from 'react-router-dom';

const PaystackCheckoutSuccess = () => {
  const { resetCart } = useContext(CartContext);

  useEffect(() => {
    resetCart();
  }, []);

  return (
    <div className="checkout-success">
      <h2>Your order has been placed 🚀</h2>
      <img src={CheckoutImg} alt="successful" />
      <Link to="/paystack-order" className="btn-filled">
        Check your order
      </Link>
    </div>
  );
};

export default PaystackCheckoutSuccess;
