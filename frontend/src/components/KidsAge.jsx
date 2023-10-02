const KidsAge = ({ selectedKidsAge, setSelectedKidsAge }) => {
  const handleKidsAgeChange = (event) => {
    const kidsAge = event.target.value;
    if (selectedKidsAge.includes(kidsAge)) {
      // If already selected, remove it
      setSelectedKidsAge(selectedKidsAge.filter((k) => k !== kidsAge));
    } else {
      // If not selected, add it
      setSelectedKidsAge([...selectedKidsAge, kidsAge]);
    }
  };

  return (
    <div className="gender-price-container">
      <label className="gender-price-label">
        Kids Age({selectedKidsAge.length})
      </label>
      <div className="gender-price-options">
        <label className="gender-price-option">
          <input
            type="checkbox"
            name="kids-age"
            value="big-kids"
            checked={selectedKidsAge.includes('big-kids')}
            onChange={handleKidsAgeChange}
          />
          <div className="checkbox"></div>
          <p>Big Kids (7-15yrs)</p>
        </label>
        <label className="gender-price-option">
          <input
            type="checkbox"
            name="kids-age"
            value="little-kids"
            checked={selectedKidsAge.includes('little-kids')}
            onChange={handleKidsAgeChange}
          />
          <div className="checkbox"></div>
          <p>Little Kids (3-7yrs)</p>
        </label>
        <label className="gender-price-option">
          <input
            type="checkbox"
            name="kids-age"
            value="babies"
            checked={selectedKidsAge.includes('babies')}
            onChange={handleKidsAgeChange}
          />
          <div className="checkbox"></div>
          <p>Babies & Toddlers (0-3yrs)</p>
        </label>
      </div>
    </div>
  );
};

export default KidsAge;
