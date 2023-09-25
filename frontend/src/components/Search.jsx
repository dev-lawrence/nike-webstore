import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SearchMenu from './SearchMenu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useState } from 'react';
const { VITE_API_URL } = import.meta.env;
import axios from 'axios';

const Search = ({ searchClick, handleSearchClick, inputRef }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearchQueryChange = async () => {
    const newSearchQuery = inputRef.current.value;

    if (newSearchQuery) {
      try {
        setLoading(true);
        const response = await axios.get(
          `${VITE_API_URL}/products/search/${newSearchQuery}`
        );

        setSearchResults(response.data);
      } catch (error) {
        if (error.response.status === 404) {
          setErrorMessage('Product not found.');
          console.error('Product not found.');
        } else {
          console.error('Error searching for products:', error);
          setErrorMessage('An error occurred while searching for products.');
        }
      } finally {
        setLoading(false);
      }
    } else {
      // Clear search results when search query is empty
      setSearchResults([]);
      setErrorMessage(null);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const handleClearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }

    // Clear search results and error message
    setSearchResults([]);
    setErrorMessage(null);
  };

  // Check if the input field is empty
  const isInputEmpty = !inputRef.current?.value;

  return (
    <div className="search-icon">
      <div className="search-icon-container">
        <form
          onSubmit={handleFormSubmit}
          className={`search-icon-box ${searchClick ? 'openSearchBox' : ''}`}
        >
          <input
            className={`input ${searchClick ? 'showBg' : ''}`}
            type="text"
            ref={inputRef}
            placeholder="Search"
            onChange={handleSearchQueryChange}
          />

          {isInputEmpty ? null : (
            <div className="close-menu" onClick={handleClearInput}>
              <CloseRoundedIcon />
            </div>
          )}

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

      {searchClick && (
        <SearchMenu
          handleSearchClick={handleSearchClick}
          searchClick={searchClick}
          searchResults={searchResults}
          errorMessage={errorMessage}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Search;
