const OrderItem = ({ order, gateway }) => (
  <>
    {/* Stripe Orders */}
    {gateway === 'Stripe' && (
      <div className="order" key={order._id}>
        <p className="id">Order reference: {order.paymentIntentId}</p>
        <p className="payment-status">
          Status: <span className="status">{order.payment_status}</span>
        </p>
        <p className="delivery-status">
          Delivery: <span className="status">{order.delivery_status}</span>
        </p>
        <p className="createdAt">
          Date:{' '}
          {new Date(order.createdAt).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'long',
            day: 'numeric',
          })}{' '}
          {new Date(order.createdAt).toLocaleTimeString('en-US', {
            timeStyle: 'short',
          })}
        </p>

        <div className="order-flex">
          {order.product.map((item) => (
            <div key={item.id} className="item">
              <div className="items-details">
                <h4 className="name">{item.description}</h4>
                <h4 className="price">${item.amount_total / 100}</h4>
                <span className="quantity">Quantity: {item.quantity}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="total">Total: ${order.subtotal / 100}</p>
      </div>
    )}

    {/* Paystack Orders */}
    {gateway === 'Paystack' && (
      <div className="order" key={order._id}>
        <p className="id">Order reference: {order.reference}</p>
        <p className="payment-status">
          Status: <span className="status">{order.payment_status}</span>
        </p>
        <p className="delivery-status">
          Delivery: <span className="status">{order.delivery_status}</span>
        </p>
        <p className="createdAt">
          Date:{' '}
          {new Date(order.createdAt).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'long',
            day: 'numeric',
          })}{' '}
          {new Date(order.createdAt).toLocaleTimeString('en-US', {
            timeStyle: 'short',
          })}
        </p>

        <div className="order-flex">
          {order.product.map((item) => (
            <div key={item.id} className="item">
              <img src={item.image} alt="" />
              <div className="items-details">
                <h4 className="name">{item.name}</h4>
                {/* <h4 className="price">₦{item.price * 100}</h4> */}
                <h4 className="price">
                  ₦
                  {(item.price * 100).toLocaleString('en-US', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })}
                </h4>
                <h4 className="name">{item.description}</h4>
                <span className="quantity">Quantity: {item.quantity} </span>
                <span className="size">Size: {item.size}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="total">
          Total: ₦
          {(order.total / 10).toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
    )}
  </>
);

export default OrderItem;
