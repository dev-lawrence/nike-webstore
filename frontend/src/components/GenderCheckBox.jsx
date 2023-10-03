const GenderCheckBox = ({ label, value, checked, onChange }) => {
  return (
    <label className="gender-price-option">
      <input
        type="checkbox"
        name="gender"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <div className="checkbox"></div>
      <p>{label}</p>
    </label>
  );
};

export default GenderCheckBox;
