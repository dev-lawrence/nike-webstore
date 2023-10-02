import useFetchData from '../../hooks/useFetchData';
import { useState } from 'react';
import Shop from '../../components/Shop';
import Hero from '../../components/Hero';
const { VITE_API_URL } = import.meta.env;
import { Loading } from '../../components/Loading';

const BigKids = () => {
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedKidsAge, setSelectedKidsAge] = useState(['big-kids']);

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

  // Filter products by kids age
  const filterProductsByKidsAge = (product) => {
    if (selectedKidsAge.length === 0) {
      return true;
    } else {
      return selectedKidsAge.includes(product.gender);
    }
  };

  return (
    <Shop
      categoryTitle="Big Kids' Products"
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
      filterProductsByKidsAge={filterProductsByKidsAge}
    />
  );
};

export default BigKids;
