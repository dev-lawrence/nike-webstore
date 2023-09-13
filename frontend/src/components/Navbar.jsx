import { NavLink } from 'react-router-dom';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

const Navbar = ({ navClick, handleNavClose }) => {
  const handleNavLinkClick = () => {
    handleNavClose();
    window.scrollTo(0, 0);
  };

  return (
    <>
      <nav className={`nav ${navClick ? 'showMenu' : ''}`}>
        <ul className="menu" role="list" aria-label="list">
          <li>
            <NavLink to="men">Men</NavLink>
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

          <li>
            <NavLink to="favorite" onClick={handleNavLinkClick}>
              <FavoriteRoundedIcon className="heart" /> Favorites
            </NavLink>
          </li>

          <li>
            <NavLink to="contact">Sales</NavLink>
          </li>

          <div className="mobile-sign-in">
            <p>
              Become a Nike Member for the best products, inspiration and
              stories in sport.
            </p>

            <div className="flex">
              <button className="btn-filled">join us</button>
              <button className="btn-outline">sign in</button>
            </div>
          </div>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
