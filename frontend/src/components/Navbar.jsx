import { NavLink } from 'react-router-dom';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = ({ navClick, handleNavClose }) => {
  const { user, loginWithPopup, isAuthenticated, logout } = useAuth0();

  const handleNavLinkClick = () => {
    handleNavClose();
    window.scrollTo(0, 0);
  };

  return (
    <>
      <nav className={`nav ${navClick ? 'showMenu' : ''}`}>
        <ul className="menu" role="list" aria-label="list">
          {user && (
            <div className="user-avatar">
              <img src={user.picture} alt="avatar" className="mobile-avatar" />
              <p>{user.name}</p>
            </div>
          )}

          <li>
            <NavLink to="men" onClick={handleNavLinkClick}>
              Men
            </NavLink>
          </li>

          <li>
            <NavLink to="shop">Women</NavLink>
          </li>

          <li>
            <NavLink to="about">Kids</NavLink>
          </li>

          <li>
            <NavLink to="blog">Accessories</NavLink>
          </li>

          {user && (
            <li className={`favorite ${user ? 'show' : ''}`}>
              <NavLink to="favorite" onClick={handleNavLinkClick}>
                <FavoriteRoundedIcon className="heart" /> Favorites
              </NavLink>
            </li>
          )}

          <li>
            <NavLink to="contact">Sales</NavLink>
          </li>

          <div className="mobile-sign-in">
            <p>
              Become a Nike Member for the best products, inspiration and
              stories in sport.
            </p>

            {!isAuthenticated && (
              <div className="flex">
                <button className="btn-filled" onClick={() => loginWithPopup()}>
                  join us
                </button>
                <button
                  className="btn-outline"
                  onClick={() => loginWithPopup()}
                >
                  sign in
                </button>
              </div>
            )}

            {user && (
              <button className="btn-filled sign-out" onClick={() => logout()}>
                sign out
              </button>
            )}
          </div>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
