import { Link } from 'react-router-dom';
import { Loading } from './Loading';
import Card from './Card';

const SearchMenu = ({
  handleSearchClick,
  searchResults,
  errorMessage,
  loading,
  inputRef,
}) => {
  const displayedProducts = searchResults.slice(1, 4);

  return (
    <div className="search-menu">
      <ul className="menu" role="list" aria-label="list">
        {searchResults.length === 0 && !loading && !errorMessage && (
          <>
            <h3>Popular Search Terms</h3>
            <li
              onClick={() => {
                handleSearchClick();
                if (inputRef.current) {
                  inputRef.current.blur();
                }
              }}
            >
              <Link to="/product/air-jordan-5-retro-se">Jordan</Link>
            </li>

            <li onClick={handleSearchClick}>
              <Link to="/product/dunk-low-big-kids-shoes">Nike Dunk</Link>
            </li>

            <li onClick={handleSearchClick}>
              <Link to="/product/club-unstructured-swoosh-cap">Nike Club</Link>
            </li>

            <li onClick={handleSearchClick}>
              <Link to="/product/sportswear-lightweight-synthetic-fill-big-kids-loose-hooded-jacket">
                Nike Sportswear
              </Link>
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
