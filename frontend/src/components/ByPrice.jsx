const ByPrice = ({ selectedPrices, setSelectedPrices, priceRanges }) => {
  const handlePriceChange = (event) => {
    const price = event.target.value;
    if (selectedPrices.includes(price)) {
      // If already selected, remove it
      setSelectedPrices(selectedPrices.filter((p) => p !== price));
    } else {
      // If not selected, add it
      setSelectedPrices([...selectedPrices, price]);
    }
  };

  return (
    <div className="gender-price-container">
      <label className="gender-price-label">
        Shop by Price({selectedPrices.length})
      </label>
      <div className="gender-price-options">
        {priceRanges &&
          priceRanges.map((range) => (
            <label className="gender-price-option" key={range.label}>
              <input
                type="checkbox"
                name="price"
                value={range.label}
                checked={selectedPrices.includes(range.label)}
                onChange={handlePriceChange}
              />
              <div className="checkbox"></div>
              <p>{range.label}</p>
            </label>
          ))}
      </div>
    </div>
  );
};

export default ByPrice;
