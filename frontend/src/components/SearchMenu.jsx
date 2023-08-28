import { NavLink } from 'react-router-dom';

const SearchMenu = ({ handleSearchClick, searchClick }) => {
  return (
    <div className="search-menu">
      {/* <button
        onClick={handleSearchClick}
        className={`cancel ${searchClick ? 'show' : ''}`}
      >
        cancel
      </button> */}
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
      </ul>
    </div>
  );
};

export default SearchMenu;
