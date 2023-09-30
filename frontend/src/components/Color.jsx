const Color = ({ isSidebar, selectedColors, setSelectedColors }) => {
  const handleColorChange = (event) => {
    const color = event.target.value;
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
      <label className="color-label">Color</label>
      <div className={`color-options ${isSidebar ? 'sidebar-options' : ''}`}>
        <label className="color-option">
          <input
            type="checkbox"
            name="color"
            value="purple"
            checked={selectedColors.includes('purple')}
            onChange={handleColorChange}
          />
          <div className="checkbox | purple"></div>
          <p>Purple</p>
        </label>

        <label className="color-option">
          <input
            type="checkbox"
            name="color"
            value="black"
            checked={selectedColors.includes('black')}
            onChange={handleColorChange}
          />
          <div className="checkbox | black"></div>
          <p>Black</p>
        </label>

        <label className="color-option">
          <input
            type="checkbox"
            name="color"
            value="red"
            checked={selectedColors.includes('red')}
            onChange={handleColorChange}
          />
          <div className="checkbox | red"></div>
          <p>Red</p>
        </label>

        <label className="color-option">
          <input
            type="checkbox"
            name="color"
            value="brown"
            checked={selectedColors.includes('brown')}
            onChange={handleColorChange}
          />
          <div className="checkbox | brown"></div>
          <p>Brown</p>
        </label>

        <label className="color-option">
          <input
            type="checkbox"
            name="color"
            value="orange"
            checked={selectedColors.includes('orange')}
            onChange={handleColorChange}
          />
          <div className="checkbox | orange"></div>
          <p>Orange</p>
        </label>

        <label className="color-option">
          <input
            type="checkbox"
            name="color"
            value="blue"
            checked={selectedColors.includes('blue')}
            onChange={handleColorChange}
          />
          <div className="checkbox | blue"></div>
          <p>Blue</p>
        </label>
      </div>
    </div>
  );
};

export default Color;
