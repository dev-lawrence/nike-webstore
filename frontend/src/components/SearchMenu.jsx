import { Link } from 'react-router-dom';

const SearchMenu = () => {
  return (
    <div className="search-menu">
      <ul className="menu" role="list" aria-label="list">
        <h3>Popular Search Terms</h3>
        <li>
          <Link to="/">Jordan</Link>
        </li>

        <li>
          <Link to="shop">Air Max</Link>
        </li>

        <li>
          <Link to="about">Blazer</Link>
        </li>

        <li>
          <Link to="blog">Nike Shoes</Link>
        </li>
      </ul>
    </div>
  );
};

export default SearchMenu;
