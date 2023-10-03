import { useState } from 'react';

const useSelectedKidsAge = (initialSelectedAge) => {
  const [selectedKidsAge, setSelectedKidsAge] = useState(initialSelectedAge);

  const handleKidsAgeChange = (kidsAge) => {
    setSelectedKidsAge((prevSelectedKidsAge) => {
      if (prevSelectedKidsAge.includes(kidsAge)) {
        return prevSelectedKidsAge.filter((k) => k !== kidsAge);
      } else {
        return [...prevSelectedKidsAge, kidsAge];
      }
    });
  };

  return { selectedKidsAge, handleKidsAgeChange };
};

export default useSelectedKidsAge;
