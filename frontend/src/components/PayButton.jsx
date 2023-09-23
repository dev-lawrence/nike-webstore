import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import Spinner from './Spinner';
import { useClerk } from '@clerk/clerk-react';
const { VITE_API_URL } = import.meta.env;

const stripePromise = loadStripe(
  'pk_test_51NLk1DA0G44xrEVcpuH1P2RzDgdnMC85Yo6pxG9gtvMdiHbtbyKjQn34f8j4TvYxux5QIedeOAS2kh0iBxonX7Qq00polShwlz'
);

const PayButton = ({ products }) => {
  const { user, openSignIn } = useClerk();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      openSignIn();
      return;
    }

    try {
      setIsProcessing(true);
      const stripe = await stripePromise;

      const response = await axios.post(
        `${VITE_API_URL}/stripe/create-checkout-session`,
        {
          products,
          userId: user.id,
        }
      );

      await stripe.redirectToCheckout({
        sessionId: response.data.stripeSession.id,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <button
        className="cta"
        onClick={() => handleCheckout()}
        disabled={isProcessing}
      >
        {isProcessing ? <Spinner /> : user ? 'Checkout' : 'Sign In to pay'}
      </button>
    </>
  );
};

export default PayButton;
