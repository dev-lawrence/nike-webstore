import Hero from '../../components/Hero';
import useFetchData from '../../hooks/useFetchData';
import Shop from '../../components/Shop';
const { VITE_API_URL } = import.meta.env;
import { Loading } from '../../components/Loading';
import useSelectedGenders from '../../hooks/useSelectedGenders';
import useSelectedKidsAge from '../../hooks/useSelectedKidsAge';

const MClothing = () => {
  const { selectedGenders, handleGenderChange } = useSelectedGenders(['men']);
  const { selectedKidsAge } = useSelectedKidsAge([]);

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
      return (
        selectedGenders.includes(product.gender) &&
        product.subcategory === 'clothing'
      );
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
    <Shop
      categoryTitle="Mens Clothing"
      text="Shop"
      filterData={products}
      loading={loading}
      error={error}
      genderFilter={true}
      kidsFilter={false}
      priceFilter={true}
      colorFilter={true}
      categoryFilter={true}
      selectedGenders={selectedGenders}
      handleGenderChange={handleGenderChange}
      filterProductsByGender={filterProductsByGender}
      filterProductsByKidsAge={filterProductsByKidsAge}
    />
  );
};

export default MClothing;
