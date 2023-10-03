import GenderCheckBox from './GenderCheckBox';

const Gender = ({ selectedGenders, handleGenderChange }) => {
  const genderOptions = [
    { label: 'Men', value: 'men' },
    { label: 'Women', value: 'women' },
    { label: 'Unisex', value: 'unisex' },
  ];

  return (
    <div className="gender-price-container">
      <label className="gender-price-label">
        Gender({selectedGenders.length})
      </label>

      <div className="gender-price-options">
        {genderOptions.map((option) => (
          <GenderCheckBox
            key={option.value}
            label={option.label}
            value={option.value}
            checked={selectedGenders.includes(option.value)}
            onChange={() => handleGenderChange(option.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gender;
