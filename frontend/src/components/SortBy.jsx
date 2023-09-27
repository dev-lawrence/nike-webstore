const SortBy = ({ handleSortChange, sortOption }) => {
  return (
    <div className="sort">
      <label className="sort-label">Sort By</label>
      <div className="sort-options">
        <label className="sort-option">
          <input
            type="radio"
            name="sortBy"
            value="Sort by latest"
            checked={sortOption === 'Sort by latest'}
            onChange={handleSortChange}
          />
          <div className="radio"></div>
          <p>Featured</p>
        </label>
        <label className="sort-option">
          <input
            type="radio"
            name="sortBy"
            value="sortbynewest"
            checked={sortOption === 'sortbynewest'}
            onChange={handleSortChange}
          />
          <div className="radio"></div>
          <p>Newest</p>
        </label>
        <label className="sort-option">
          <input
            type="radio"
            name="sortBy"
            value="hightolow"
            checked={sortOption === 'hightolow'}
            onChange={handleSortChange}
          />
          <div className="radio"></div>
          <p>Price: High-Low</p>
        </label>
        <label className="sort-option">
          <input
            type="radio"
            name="sortBy"
            value="lowtohigh"
            checked={sortOption === 'lowtohigh'}
            onChange={handleSortChange}
          />
          <div className="radio"></div>
          <p>Price: Low-High</p>
        </label>
      </div>
    </div>
  );
};

export default SortBy;
