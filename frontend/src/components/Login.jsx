import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { SignedOut, SignInButton } from '@clerk/clerk-react';
const Login = () => {
  return (
    <SignedOut>
      <SignInButton mode="modal">
        <div className="user-info">
          <button className="user icon-btn">
            <AccountCircleIcon className="user-icon" />
          </button>
        </div>
      </SignInButton>
    </SignedOut>
  );
};

export default Login;
