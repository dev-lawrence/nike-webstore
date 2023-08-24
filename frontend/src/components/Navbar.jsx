import { NavLink } from 'react-router-dom';

const Navbar = ({ navClick }) => {
  return (
    <>
      <nav className={`nav ${navClick ? 'showMenu' : ''}`}>
        <ul className="menu" role="list" aria-label="list">
          <li>
            <NavLink to="/">Men</NavLink>
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
