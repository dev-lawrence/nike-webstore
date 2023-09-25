export const Loading = ({ isSearched }) => {
  return (
    <>
      <div
        className={`loading-container ${isSearched ? 'search-spinner' : ''}`}
      >
        <div className="loading-spinner"></div>
      </div>
    </>
  );
};
