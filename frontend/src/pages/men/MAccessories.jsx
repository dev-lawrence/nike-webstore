import { useState } from 'react';
import useFetchData from '../../hooks/useFetchData';
import Shop from '../../components/Shop';
const { VITE_API_URL } = import.meta.env;
import { Loading } from '../../components/Loading';

const MAccessories = () => {
  const [selectedGenders, setSelectedGenders] = useState(['men']);
  const {
    data: products,
    loading,
    error,
  } = useFetchData(`${VITE_API_URL}/products`);

  if (!Array.isArray(products)) {
    return (
      <>
        <Loading />
      </>
    );
  }

  const filterProductsByGender = (product) => {
    if (selectedGenders.length === 0) {
      return true;
    } else {
      return (
        selectedGenders.includes(product.gender) &&
        product.subcategory === 'accessories'
      );
    }
  };

  return (
    <Shop
      categoryTitle="Mens Accessories & Equipment"
      filterData={products}
      genderFilter={true}
      priceFilter={true}
      colorFilter={true}
      categoryFilter={true}
      selectedGenders={selectedGenders}
      setSelectedGenders={setSelectedGenders}
      filterProductsByGender={filterProductsByGender}
    />
  );
};

export default MAccessories;
