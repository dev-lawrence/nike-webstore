const Gender = ({ selectedGenders, setSelectedGenders }) => {
  const handleGenderChange = (event) => {
    const gender = event.target.value;
    if (selectedGenders.includes(gender)) {
      // If already selected, remove it
      setSelectedGenders(selectedGenders.filter((g) => g !== gender));
    } else {
      // If not selected, add it
      setSelectedGenders([...selectedGenders, gender]);
    }
  };

  return (
    <div className="gender-price-container">
      <label className="gender-price-label">
        Gender({selectedGenders.length})
      </label>
      <div className="gender-price-options">
        <label className="gender-price-option">
          <input
            type="checkbox"
            name="gender"
            value="men"
            checked={selectedGenders.includes('men')}
            onChange={handleGenderChange}
          />
          <div className="checkbox"></div>
          <p>Men</p>
        </label>
        <label className="gender-price-option">
          <input
            type="checkbox"
            name="gender"
            value="women"
            checked={selectedGenders.includes('women')}
            onChange={handleGenderChange}
          />
          <div className="checkbox"></div>

          <p>Women</p>
        </label>
        <label className="gender-price-option">
          <input
            type="checkbox"
            name="gender"
            value="unisex"
            checked={selectedGenders.includes('unisex')}
            onChange={handleGenderChange}
          />
          <div className="checkbox"></div>
          <p>Unisex</p>
        </label>
      </div>
    </div>
  );
};

export default Gender;
