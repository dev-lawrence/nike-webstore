const KidsAgeCheckBox = ({ label, value, checked, onChange }) => {
  return (
    <label className="gender-price-option">
      <input
        type="checkbox"
        autoComplete="false"
        name="kids-age"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <div className="checkbox"></div>
      <p>{label}</p>
    </label>
  );
};

export default KidsAgeCheckBox;
