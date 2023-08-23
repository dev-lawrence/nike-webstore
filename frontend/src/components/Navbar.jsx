import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <nav className="nav">
        <ul className="menu">
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
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
