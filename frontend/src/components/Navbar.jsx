import { NavLink } from 'react-router-dom';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  useClerk,
} from '@clerk/clerk-react';

const Navbar = ({ navClick, handleNavClose }) => {
  const { user, signOut } = useClerk();

  if (user) {
    console.log('signed in');
  } else {
    console.log('signed out');
  }

  const handleSignOut = () => {
    signOut().then(() => {
      window.location.reload();
    });
  };

  const handleNavLinkClick = () => {
    handleNavClose();
    window.scrollTo(0, 0);
  };

  return (
    <>
      <nav className={`nav ${navClick ? 'showMenu' : ''}`}>
        <ul className="menu" role="list" aria-label="list">
          {user && (
            <SignedIn>
              <div className="user-avatar">
                <img
                  src={user.imageUrl}
                  alt="avatar"
                  className="mobile-avatar"
                />
                <p>{user.fullName}</p>
              </div>
            </SignedIn>
          )}
          <li>
            <NavLink to="men" onClick={handleNavLinkClick}>
              Men
            </NavLink>
          </li>
          <li>
            <NavLink to="women" onClick={handleNavLinkClick}>
              Women
            </NavLink>
          </li>
          <li>
            <NavLink to="kids" onClick={handleNavLinkClick}>
              Kids
            </NavLink>
          </li>
          <li>
            <NavLink to="accessories">Accessories</NavLink>
          </li>
          {user && (
            <li className={`favorite ${user ? 'show' : ''}`}>
              <NavLink to="favorite" onClick={handleNavLinkClick}>
                <FavoriteRoundedIcon className="heart" /> Favorites
              </NavLink>
            </li>
          )}

          {user && (
            <li className={`favorite ${user ? 'show' : ''}`}>
              <NavLink to="order" onClick={handleNavLinkClick}>
                Orders
              </NavLink>
            </li>
          )}

          <li>
            <NavLink to="contact" onClick={handleNavLinkClick}>
              Contact
            </NavLink>
          </li>
          <div className="mobile-sign-in">
            <SignedOut>
              <p>
                Become a Nike Member for the best products, inspiration and
                stories in sport.
              </p>
              <div className="flex">
                <SignUpButton mode="modal">
                  <button className="btn-filled">join us</button>
                </SignUpButton>

                <SignInButton mode="modal">
                  <button className="btn-outline">sign in</button>
                </SignInButton>
              </div>
            </SignedOut>

            {user && (
              <SignedIn>
                <button className="btn-filled sign-out" onClick={handleSignOut}>
                  sign out
                </button>
              </SignedIn>
            )}
          </div>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
