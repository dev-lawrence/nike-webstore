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
  const { user } = useClerk();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
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
        {isProcessing ? <Spinner /> : 'Checkout'}
      </button>
    </>
  );
};

export default PayButton;

// REAL CODE
// import React from 'react';
// import axios from 'axios';
// const { VITE_API_URL } = import.meta.env;
// import { useClerk } from '@clerk/clerk-react';

// const PayButton = ({ products }) => {
//   const { user } = useClerk();

//   const handleCheckout = async () => {
//     axios
//       .post(`${VITE_API_URL}/stripe/create-checkout-session`, {
//         products,
//         userId: user.id,
//       })
//       .then((res) => {
//         if (res.data.url) {
//           window.location.href = res.data.url;
//         }
//       })
//       .catch((err) => {
//         console.error(err.message);
//       });
//   };

//   return (
//     <>
//       <button className="cta" onClick={() => handleCheckout()}>
//         Checkout
//       </button>
//     </>
//   );
// };

// export default PayButton;
