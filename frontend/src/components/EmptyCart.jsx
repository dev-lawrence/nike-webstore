import EmptyCartImg from '../assets/empty-cart-2.png';

const EmptyCart = ({ handleCartClose }) => {
  return (
    <div className="empty">
      <img src={EmptyCartImg} alt="" />
      <button className="cart-btn" onClick={handleCartClose}>
        Continue Shopping
      </button>
    </div>
  );
};

export default EmptyCart;
