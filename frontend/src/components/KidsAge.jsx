import KidsAgeCheckBox from './KidsAgeCheckBox';

const KidsAge = ({ selectedKidsAge, handleKidsAgeChange }) => {
  const kidsAgeOptions = [
    { label: 'Big Kids (7-15yrs)', value: 'big-kids' },
    { label: 'Little Kids (3-7yrs)', value: 'little-kids' },
    { label: 'Babies & Toddlers (0-3yrs)', value: 'babies' },
  ];

  return (
    <div className="gender-price-container">
      <label className="gender-price-label">
        Kids Age({selectedKidsAge.length})
      </label>
      <div className="gender-price-options">
        {kidsAgeOptions.map((option) => (
          <KidsAgeCheckBox
            key={option.value}
            label={option.label}
            value={option.value}
            checked={selectedKidsAge.includes(option.value)}
            onChange={() => handleKidsAgeChange(option.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default KidsAge;
