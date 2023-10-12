import { useState, useRef, useEffect } from 'react';
import Hero from './Hero';
import FilterIcon from '../components/FilterIcon';
import FilterModal from './FilterModal';
import Card from './Card';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Gender from './Gender';
import ByPrice from './ByPrice';
import Color from './Color';
import KidsAge from './KidsAge';
import PageBreadCrumbs from './PageBreadCrumbs';
import SkeletonPopular from './Skeleton/SkeletonPopular';
import { Helmet } from 'react-helmet-async';

const Shop = ({
  categoryTitle,
  filterData,
  loading,
  error,
  genderFilter,
  priceFilter,
  colorFilter,
  kidsFilter,
  selectedGenders,
  handleGenderChange,
  filterProductsByGender,
  filterProductsByKidsAge,
  selectedKidsAge,
  handleKidsAgeChange,
  text,
  isAccessories,
}) => {
  // State variables for managing component state
  const [openModal, setOpenModal] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [sortOption, setSortOption] = useState('Sort by latest');
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sidebarTop, setSidebarTop] = useState(30);
  const shopProductsRef = useRef(null);

  // Determine if the gender filter should be visible based on selected kids age
  const isKidsFilterVisible =
    selectedGenders.includes('men') ||
    selectedGenders.includes('women') ||
    selectedGenders.includes('unisex');

  // Determine if the kids filter should be visible based on selected genders
  const isGenderFilterVisible =
    selectedKidsAge?.includes('big-kids') ||
    selectedKidsAge?.includes('little-kids') ||
    selectedKidsAge?.includes('babies');

  // Function to handle scroll events
  const handleScroll = () => {
    if (shopProductsRef.current) {
      setSidebarTop(shopProductsRef.current.scrollTop);
    }
  };

  // Add scroll event listener when the component mounts and remove it when it unmounts
  useEffect(() => {
    if (shopProductsRef.current) {
      shopProductsRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (shopProductsRef.current) {
        shopProductsRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Toggle filter modal visibility
  const popUpToggleModal = () => {
    setOpenModal(!openModal);

    if (!openModal) {
      document.body.classList.add('hide-scroll');
    } else {
      document.body.classList.remove('hide-scroll');
    }
  };

  // Toggle sidebar visibility
  const hideToggleModal = () => {
    setOpenSideBar(!openSideBar);
  };

  // Filter products by price range
  const priceRanges = [
    { label: '$25-$50', minPrice: 25, maxPrice: 50 },
    { label: '$50-$100', minPrice: 50, maxPrice: 100 },
    { label: '$100-$150', minPrice: 100, maxPrice: 150 },
    { label: 'Over $150', minPrice: 150, maxPrice: 1000 },
  ];

  // Filter products by price
  const filterProductsByPrice = (product) => {
    if (selectedPrices.length === 0) {
      return true;
    } else {
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

  // Filter products by color
  const filterProductsByColor = (product) => {
    if (selectedColors.length === 0) {
      return true;
    } else {
      console.log(selectedColors);
      return selectedColors.includes(product.color);
    }
  };

  //   Sort Data
  let sortedData = [...filterData];

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

  // Filtered Data
  const newFilteredData = sortedData
    .filter(filterProductsByGender)
    .filter(filterProductsByPrice)
    .filter(filterProductsByColor)
    .filter(filterProductsByKidsAge);

  // Filter products by subcategory
  const accessoriesData = isAccessories
    ? newFilteredData.filter((product) => product.subcategory === 'accessories')
    : newFilteredData;

  // Extract available colors based on filtered products
  const availableColors = Array.from(
    new Set(accessoriesData.map((product) => product.color))
  );

  return (
    <>
      <section
        className={`shop | shoe | ${isAccessories ? 'accessories' : ''} `}
      >
        <Hero text={text} />
        <Helmet>
          <title>{categoryTitle}</title>
        </Helmet>
        <div className="container shop-section">
          <div className="title">
            <h2>
              {categoryTitle}({newFilteredData.length})
            </h2>
          </div>

          <div className="heading-flex">
            <PageBreadCrumbs />

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
                  handleGenderChange={handleGenderChange}
                  selectedPrices={selectedPrices}
                  setSelectedPrices={setSelectedPrices}
                  priceRanges={priceRanges}
                  selectedColors={selectedColors}
                  availableColors={availableColors}
                  setSelectedColors={setSelectedColors}
                  genderFilter={!isGenderFilterVisible && genderFilter}
                  selectedKidsAge={selectedKidsAge}
                  handleKidsAgeChange={handleKidsAgeChange}
                  kidsFilter={!isKidsFilterVisible && kidsFilter}
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
              className={`sidebar ${openSideBar ? 'hide' : ''}`}
              style={{ top: sidebarTop }}
            >
              {!isGenderFilterVisible && genderFilter && (
                <Gender
                  selectedGenders={selectedGenders}
                  handleGenderChange={handleGenderChange}
                />
              )}

              {!isKidsFilterVisible && kidsFilter && (
                <KidsAge
                  selectedKidsAge={selectedKidsAge}
                  handleKidsAgeChange={handleKidsAgeChange}
                />
              )}

              {priceFilter && (
                <ByPrice
                  selectedPrices={selectedPrices}
                  setSelectedPrices={setSelectedPrices}
                  priceRanges={priceRanges}
                />
              )}

              {colorFilter && (
                <Color
                  selectedColors={selectedColors}
                  setSelectedColors={setSelectedColors}
                  availableColors={availableColors}
                  isSidebar={true}
                />
              )}
            </aside>

            <div className="shop-products" ref={shopProductsRef}>
              {loading ? (
                <div>
                  <SkeletonPopular />
                </div>
              ) : error ? (
                <div>
                  <SkeletonPopular />
                </div>
              ) : (
                <>
                  {accessoriesData &&
                    accessoriesData.map((product) => (
                      <Card key={product._id} product={product} isShop={true} />
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
