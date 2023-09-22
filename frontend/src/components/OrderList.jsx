import OrderItem from './OrderItem';
import { Helmet } from 'react-helmet-async';

const OrderList = ({ orders }) => (
  <div className="orders pt-section">
    <Helmet>
      <title>Order History</title>
    </Helmet>
    <div className="container">
      <h2>Order History</h2>
      {orders.map((order) => (
        <OrderItem key={order._id} order={order} />
      ))}
    </div>
  </div>
);

export default OrderList;
