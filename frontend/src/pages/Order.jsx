import OrderList from '../components/OrderList';
import useFetchData from '../hooks/useFetchData.js';
const { VITE_API_URL } = import.meta.env;
import { useClerk } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Order = () => {
  const { user } = useClerk();

  const {
    data: orders,
    loading,
    error,
  } = useFetchData(`${VITE_API_URL}/stripe/orders/`);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p className="error">Error occurred: {error.message}</p>;
  }

  // Filter orders for the current user
  const userOrders = orders.filter((order) => order.userId === user?.id);

  if (!userOrders || userOrders.length === 0) {
    return (
      <div className="pt-section | favorites | container">
        <p className="mb-1">No orders to show</p>
        <Link className="btn-filled" to="/">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return <OrderList orders={userOrders} />;
};

export default Order;
