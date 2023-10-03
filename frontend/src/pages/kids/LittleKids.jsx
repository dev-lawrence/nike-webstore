import useFetchData from '../../hooks/useFetchData';
import Shop from '../../components/Shop';
import Hero from '../../components/Hero';
const { VITE_API_URL } = import.meta.env;
import { Loading } from '../../components/Loading';
import useSelectedGenders from '../../hooks/useSelectedGenders';
import useSelectedKidsAge from '../../hooks/useSelectedKidsAge';

const LittleKids = () => {
  const { selectedGenders, handleGenderChange } = useSelectedGenders([]);
  const { selectedKidsAge, handleKidsAgeChange } = useSelectedKidsAge([
    'little-kids',
  ]);
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
      categoryTitle="Little Kids' Products"
      text="Shop"
      filterData={products}
      genderFilter={false}
      priceFilter={true}
      colorFilter={true}
      categoryFilter={true}
      kidsFilter={true}
      selectedGenders={selectedGenders}
      handleGenderChange={handleGenderChange}
      selectedKidsAge={selectedKidsAge}
      handleKidsAgeChange={handleKidsAgeChange}
      filterProductsByGender={filterProductsByGender}
      filterProductsByKidsAge={filterProductsByKidsAge}
    />
  );
};

export default LittleKids;
