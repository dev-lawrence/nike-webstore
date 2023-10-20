import { Loading } from '../components/Loading';
import OrderList from '../components/OrderList';
import useFetchData from '../hooks/useFetchData.js';
const { VITE_API_URL } = import.meta.env;
import { useClerk } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Order = () => {
  const { user } = useClerk();

  const {
    data: stripeOrders,
    loading: stripeLoading,
    error: stripeError,
  } = useFetchData(`${VITE_API_URL}/stripe/orders/`);

  const {
    data: paystackOrders,
    loading: paystackLoading,
    error: paystackError,
  } = useFetchData(`${VITE_API_URL}/paystack/orders/`);

  if (stripeLoading || paystackLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (stripeError || paystackError) {
    return <p className="error">Error occurred: {error.message}</p>;
  }

  // Filter orders for the current user
  const userStripeOrders =
    stripeOrders?.filter((order) => order.userId === user?.id) || [];
  const userPaystackOrders =
    paystackOrders?.filter((order) => order.userId === user?.id) || [];

  if (!userStripeOrders.length && !userPaystackOrders.length) {
    return (
      <div className="pt-section | favorites | container">
        <p className="mb-1">No orders to show</p>
        <Link className="btn-filled" to="/shop">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      <OrderList orders={userStripeOrders} gateway="Stripe" />
      <OrderList orders={userPaystackOrders} gateway="Paystack" />
    </>
  );
};

export default Order;
