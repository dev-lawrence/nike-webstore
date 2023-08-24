const CartList = ({ cartClick, handleCartClick }) => {
  return (
    <>
      <div className={`cart-container ${cartClick ? 'showCart' : ''}`}>
        <div className="cart">
          <button className="close" onClick={handleCartClick}>
            <span>Back to store 🛒</span>
          </button>

          <div className="content">
            <div className="cart-products">
              <h1>hey</h1>
            </div>
          </div>

          {/* <PayButton/> */}
        </div>
      </div>
    </>
  );
};

export default CartList;
