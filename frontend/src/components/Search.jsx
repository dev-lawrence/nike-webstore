import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SearchMenu from './SearchMenu';

const Search = ({ searchClick, handleSearchClick, inputRef }) => {
  return (
    <div className="search-icon">
      <div className="search-icon-container">
        <form
          className={`search-icon-box ${searchClick ? 'openSearchBox' : ''}`}
        >
          <input
            className={`input ${searchClick ? 'showBg' : ''}`}
            type="text"
            ref={inputRef}
            placeholder="Search"
          />
          <label
            onClick={handleSearchClick}
            htmlFor="check"
            aria-label="search-icon"
            className="search-icon-icon"
          >
            <SearchRoundedIcon />
          </label>
        </form>

        <button
          onClick={handleSearchClick}
          className={`cancel ${searchClick ? 'show' : ''}`}
        >
          cancel
        </button>
      </div>

      {searchClick ? (
        <SearchMenu
          handleSearchClick={handleSearchClick}
          searchClick={searchClick}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default Search;
