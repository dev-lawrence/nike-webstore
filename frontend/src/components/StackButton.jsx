import { useState } from 'react';
import axios from 'axios';
import { useClerk } from '@clerk/clerk-react';
import Spinner from './Spinner';

const { VITE_API_URL } = import.meta.env;

const StackButton = ({ products, totalAmount}) => {
  const [loading, setLoading] = useState(false);
  const { user, openSignIn } = useClerk();
  const email = user?.emailAddresses?.[0]?.emailAddress || '';

  const initializePayment = async () => {
    if (!user) {
      openSignIn();
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${VITE_API_URL}/paystack/create-checkout-session`,
        {
          userId: user.id,
          products: products,
          email,
          amount: totalAmount,
        }
      );

      const { authorizationUrl } = response.data;

      // Open Paystack payment page in a new tab
      const paymentWindow = window.open(authorizationUrl);

      const interval = setInterval(() => {
        if (paymentWindow.closed) {
          window.location.href = '/checkout-success';
          clearInterval(interval);
        }
      }, 1000);

      setLoading(false);
    } catch (error) {
      console.error('Error initializing payment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="cta" onClick={initializePayment}>
      {loading ? (
        <Spinner />
      ) : user ? (
        'Checkout with paystack'
      ) : (
        'Sign In to pay with paystack'
      )}
    </button>
  );
};

export default StackButton;
