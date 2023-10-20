// export default OrderList;
import React from 'react';
import { Helmet } from 'react-helmet-async';
import OrderItem from './OrderItem';

const OrderList = ({ orders, gateway }) => {
  if (orders.length === 0) {
    return null;
  }

  return (
    <div
      className={`orders ${
        gateway === 'Stripe' ? 'pt-stripe' : 'pt-paystack'
      } `}
    >
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <div className="container">
        <h2>Order History from {gateway}</h2>
        {orders.map((order) => (
          <OrderItem key={order._id} order={order} gateway={gateway} />
        ))}
      </div>
    </div>
  );
};

export default OrderList;
