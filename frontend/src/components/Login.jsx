import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const { loginWithPopup, isAuthenticated } = useAuth0();
  return (
    <div className="user-info">
      {!isAuthenticated && (
        <button className="user icon-btn" onClick={() => loginWithPopup()}>
          <AccountCircleIcon className="user-icon" />
        </button>
      )}
    </div>
  );
};

export default Login;
