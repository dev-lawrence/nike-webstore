import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SearchMenu from './SearchMenu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useState, useEffect } from 'react';
const { VITE_API_URL } = import.meta.env;
import axios from 'axios';

const Search = ({ searchClick, handleSearchClick, inputRef }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery) {
        try {
          setLoading(true);
          const response = await axios.get(
            `${VITE_API_URL}/products/search/${encodeURIComponent(searchQuery)}`
          );

          if (response.data.length === 0) {
            setSearchResults([]);
            setErrorMessage('Product not found.');
          } else {
            setErrorMessage(null);
            setSearchResults(response.data);
          }
        } catch (error) {
          console.error('Error searching for products:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setSearchResults([]);
        setErrorMessage(null);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const handleClearInput = () => {
    setSearchQuery('');
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
            value={searchQuery}
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
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
