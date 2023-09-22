import { Link } from 'react-router-dom';
import NotFoundImg from '../assets/notfound.png';

const NotFound = () => {
  return (
    <div className="not-found">
      <Link className="btn-filled" to={'/'}>
        Go to Homepage
      </Link>

      <img src={NotFoundImg} alt="404-error" />
    </div>
  );
};

export default NotFound;
