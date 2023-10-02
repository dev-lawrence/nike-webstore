import useFetchData from '../../hooks/useFetchData';
import { useState } from 'react';
import Shop from '../../components/Shop';
import Hero from '../../components/Hero';
const { VITE_API_URL } = import.meta.env;
import { Loading } from '../../components/Loading';

const BabiesToddlers = () => {
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedKidsAge, setSelectedKidsAge] = useState(['babies']);

  const {
    data: products,
    loading,
    error,
  } = useFetchData(`${VITE_API_URL}/products`);

  if (!Array.isArray(products)) {
    return (
      <section className="shop">
        <Hero text="Shop" />
        <Loading />
      </section>
    );
  }

  const filterProductsByGender = (product) => {
    if (selectedGenders.length === 0) {
      return true;
    } else {
      return selectedGenders.includes(product.gender);
    }
  };

  return (
    <Shop
      categoryTitle="Babies & Toddlers (0-3 yrs)"
      filterData={products}
      genderFilter={false}
      priceFilter={true}
      colorFilter={true}
      categoryFilter={true}
      kidsFilter={true}
      selectedGenders={selectedGenders}
      setSelectedGenders={setSelectedGenders}
      selectedKidsAge={selectedKidsAge}
      setSelectedKidsAge={setSelectedKidsAge}
      filterProductsByGender={filterProductsByGender}
    />
  );
};

export default BabiesToddlers;
