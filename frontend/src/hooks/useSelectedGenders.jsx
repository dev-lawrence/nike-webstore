import { useState } from 'react';

const useSelectedGenders = (initialSelectedGenders) => {
  const [selectedGenders, setSelectedGenders] = useState(
    initialSelectedGenders
  );

  const handleGenderChange = (gender) => {
    setSelectedGenders((prevSelectedGenders) => {
      if (prevSelectedGenders.includes(gender)) {
        return prevSelectedGenders.filter((g) => g !== gender);
      } else {
        return [...prevSelectedGenders, gender];
      }
    });
  };

  return {
    selectedGenders,
    handleGenderChange,
  };
};

export default useSelectedGenders;
