const Color = ({
  isSidebar,
  selectedColors,
  setSelectedColors,
  availableColors,
}) => {
  const colors = availableColors;

  const handleColorChange = (event) => {
    const color = event.target.value;
    // Check if the selected color is already in the selectedColors array
    if (selectedColors.includes(color)) {
      // If already selected, remove it

      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      // If not selected, add it
      setSelectedColors([...selectedColors, color]);
    }
  };

  return (
    <div className="color-container">
      <label className="color-label">Color({selectedColors.length})</label>
      <div className={`color-options ${isSidebar ? 'sidebar-options' : ''}`}>
        {colors.map((color) => (
          <label key={color} className="color-option">
            <input
              type="checkbox"
              name="color"
              value={color}
              checked={selectedColors.includes(color)}
              onChange={handleColorChange}
            />
            <div className={`checkbox | ${color}`}></div>
            <p>{color.charAt(0).toUpperCase() + color.slice(1)}</p>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Color;
