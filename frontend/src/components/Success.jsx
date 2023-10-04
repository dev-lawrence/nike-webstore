import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return (
    <div className="success">
      <div className="message">
        <h1>Thank you for submitting the form</h1>
        <Link className="cart-btn" to="/">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Success;
