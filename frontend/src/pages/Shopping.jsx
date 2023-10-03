import Shop from '../components/Shop';
import useFetchData from '../hooks/useFetchData';
const { VITE_API_URL } = import.meta.env;
import { Loading } from '../components/Loading';
import { Helmet } from 'react-helmet-async';
import useSelectedGenders from '../hooks/useSelectedGenders';
import useSelectedKidsAge from '../hooks/useSelectedKidsAge';

const Shopping = () => {
  const { selectedGenders, handleGenderChange } = useSelectedGenders([]);
  const { selectedKidsAge, handleKidsAgeChange } = useSelectedKidsAge([]);

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
      return selectedGenders.includes(product.gender);
    }
  };

  const filterProductsByKidsAge = (product) => {
    if (selectedKidsAge.length === 0) {
      return true;
    } else {
      return selectedKidsAge.includes(product.gender);
    }
  };

  return (
    <section className="accessories">
      <Helmet>
        <title>Shop</title>
      </Helmet>
      <Shop
        categoryTitle="Shop products"
        text="Shop"
        isAccessories={true}
        filterData={products}
        genderFilter={true}
        priceFilter={true}
        kidsFilter={true}
        colorFilter={true}
        categoryFilter={true}
        selectedGenders={selectedGenders}
        handleGenderChange={handleGenderChange}
        selectedKidsAge={selectedKidsAge}
        handleKidsAgeChange={handleKidsAgeChange}
        filterProductsByGender={filterProductsByGender}
        filterProductsByKidsAge={filterProductsByKidsAge}
      />
    </section>
  );
};

export default Shopping;
