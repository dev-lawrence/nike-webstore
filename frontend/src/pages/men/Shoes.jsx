import { useState, useRef } from 'react';
import Hero from '../../components/Hero';
import FilterIcon from '../../components/FilterIcon';
import FilterModal from '../../components/FilterModal';
const { VITE_API_URL } = import.meta.env;
import useFetchData from '../../hooks/useFetchData';
import Card from '../../components/Card';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Gender from '../../components/Gender';
import ByPrice from '../../components/ByPrice';
import Color from '../../components/Color';
import { Loading } from '../../components/Loading';
// import { Loading } from '../components/Loading';

// const priceRanges = [
//   { label: '$25-$50', minPrice: 25, maxPrice: 50 },
//   { label: '$50-$100', minPrice: 50, maxPrice: 100 },
//   { label: '$100-$150', minPrice: 100, maxPrice: 150 },
//   { label: 'Over $150', minPrice: 150, maxPrice: 1000 },
// ];

const Shoes = () => {
  const {
    data: products,
    loading,
    error,
  } = useFetchData(`${VITE_API_URL}/products`);

  const [openModal, setOpenModal] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [sortOption, setSortOption] = useState('Sort by latest');
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const sidebarRef = useRef(null);

  const popUpToggleModal = () => {
    setOpenModal(!openModal);

    if (!openModal) {
      document.body.classList.add('hide-scroll');
    } else {
      document.body.classList.remove('hide-scroll');
    }
  };

  const hideToggleModal = () => {
    setOpenSideBar(!openSideBar);
  };

  if (!Array.isArray(products)) {
    return (
      <>
        <Loading />
      </>
    );
  }

  // Filter by Sorting products
  let sortedData = [...products];

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  if (sortOption === 'hightolow') {
    sortedData.sort((a, b) => b.price - a.price);
  }

  if (sortOption === 'lowtohigh') {
    sortedData.sort((a, b) => a.price - b.price);
  }

  if (sortOption === 'sortbynewest') {
    sortedData = sortedData.filter((product) => product.justIn === true);
  }

  // Filter by gender
  const filterProductsByGender = (product) => {
    if (selectedGenders.length === 0) {
      return true;
    } else {
      return selectedGenders.includes(product.gender);
    }
  };

  // Filter by price
  const priceRanges = [
    { label: '$25-$50', minPrice: 25, maxPrice: 50 },
    { label: '$50-$100', minPrice: 50, maxPrice: 100 },
    { label: '$100-$150', minPrice: 100, maxPrice: 150 },
    { label: 'Over $150', minPrice: 150, maxPrice: 1000 },
  ];

  const filterProductsByPrice = (product) => {
    if (selectedPrices.length === 0) {
      // If no price range is selected, include all products
      return true;
    } else {
      // Check if the product's price falls within any of the selected price ranges
      return selectedPrices.some((priceRange) => {
        const selectedRange = priceRanges.find(
          (range) => range.label === priceRange
        );
        if (selectedRange) {
          return (
            product.price >= selectedRange.minPrice &&
            product.price <= selectedRange.maxPrice
          );
        }
        return false;
      });
    }
  };

  // Filter by color
  const filterProductsByColor = (product) => {
    if (selectedColors.length === 0) {
      return true;
    } else {
      return selectedColors.includes(product.color);
    }
  };

  // Apply the gender filter to your product data
  const filteredData = sortedData
    .filter(filterProductsByGender)
    .filter(filterProductsByPrice)
    .filter(filterProductsByColor);

  return (
    <>
      <section className="shop | shoe">
        <Hero text="Shop" />
        <div className="container shop-section">
          <div className="title">
            <h2>Men's Shoes & Sneakers</h2>
          </div>
          {/* <PageBreadCrumbs />
          {searchQuery && (
            <p className="searched-item">
              {totalLength} search results for <strong>"{searchQuery}"</strong>
            </p>
          )} */}
          <div className="heading-flex">
            <div className="result">
              <span>977 Results</span>
            </div>

            <div className="filter-sort">
              <div className="filters | filter-mobile">
                <button onClick={popUpToggleModal} className="filter-btn">
                  <p>Filter</p>
                  <FilterIcon />
                </button>
              </div>

              {openModal && (
                <FilterModal
                  closeModal={popUpToggleModal}
                  sortOption={sortOption}
                  handleSortChange={handleSortChange}
                  selectedGenders={selectedGenders}
                  setSelectedGenders={setSelectedGenders}
                  selectedPrices={selectedPrices}
                  setSelectedPrices={setSelectedPrices}
                  priceRanges={priceRanges}
                  selectedColors={selectedColors}
                  setSelectedColors={setSelectedColors}
                />
              )}

              <div className="filters | filter-desktop">
                <button
                  onClick={hideToggleModal}
                  className="filter-btn | filter-desktop-btn"
                >
                  {openSideBar ? <p>Show Filter</p> : <p>Hide Filter</p>}
                  <FilterIcon />
                </button>
              </div>

              <div className="shop-select">
                <select
                  name="sort"
                  id="sort"
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <option value="sortbylatest">Sort by latest</option>
                  <option value="hightolow">Sort by price: High to Low</option>
                  <option value="lowtohigh">Sort by price: Low to High</option>
                  <option value="sortbynewest">Sort by newest</option>
                </select>
                <ExpandMoreIcon className="arrow" />
              </div>
            </div>
          </div>

          <div className={`flex ${openSideBar ? 'hide-gap' : ''}`}>
            <aside
              ref={sidebarRef}
              className={`sidebar ${openSideBar ? 'hide' : ''}`}
            >
              <Gender
                selectedGenders={selectedGenders}
                setSelectedGenders={setSelectedGenders}
              />

              <ByPrice
                selectedPrices={selectedPrices}
                setSelectedPrices={setSelectedPrices}
                priceRanges={priceRanges}
              />

              <Color
                selectedColors={selectedColors}
                setSelectedColors={setSelectedColors}
                isSidebar={true}
              />
            </aside>

            <div className="shop-products">
              {filteredData &&
                filteredData.map((product) => {
                  return (
                    <Card key={product._id} product={product} isShop={true} />
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shoes;
