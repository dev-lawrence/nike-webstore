import { Link } from 'react-router-dom';
import { Loading } from './Loading';
import Card from './Card';

const SearchMenu = ({
  handleSearchClick,
  searchResults,
  errorMessage,
  loading,
}) => {
  const displayedProducts = searchResults.slice(1, 4);

  return (
    <div className="search-menu">
      <ul className="menu" role="list" aria-label="list">
        {searchResults.length === 0 && !loading && !errorMessage && (
          <>
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
          </>
        )}

        {loading && <Loading isSearched={true} />}

        {!loading && !errorMessage && searchResults.length > 0 && (
          <>
            <h3>Search Results</h3>
            <div className="grid">
              {displayedProducts.map((product) => (
                <li
                  key={product.slug}
                  className="searched-product"
                  onClick={handleSearchClick}
                >
                  <Card product={product} isSearchedItems={true} />
                </li>
              ))}
            </div>
          </>
        )}

        {errorMessage && !loading && <li>{errorMessage}</li>}
      </ul>
    </div>
  );
};

export default SearchMenu;
