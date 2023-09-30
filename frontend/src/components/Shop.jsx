import { useState } from 'react';
import Hero from './Hero';
import FilterIcon from '../components/FilterIcon';
import FilterModal from './FilterModal';
import Card from './Card';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Gender from './Gender';
import ByPrice from './ByPrice';
import Color from './Color';

const Shop = ({
  categoryTitle,
  filterData,
  genderFilter,
  priceFilter,
  colorFilter,
  selectedGenders,
  setSelectedGenders,
  filterProductsByGender,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [sortOption, setSortOption] = useState('Sort by latest');
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

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

  const priceRanges = [
    { label: '$25-$50', minPrice: 25, maxPrice: 50 },
    { label: '$50-$100', minPrice: 50, maxPrice: 100 },
    { label: '$100-$150', minPrice: 100, maxPrice: 150 },
    { label: 'Over $150', minPrice: 150, maxPrice: 1000 },
  ];

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

  const filterProductsByColor = (product) => {
    if (selectedColors.length === 0) {
      return true;
    } else {
      return selectedColors.includes(product.color);
    }
  };

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

  const newFilteredData = sortedData
    .filter(filterProductsByGender)
    .filter(filterProductsByPrice)
    .filter(filterProductsByColor);

  return (
    <>
      <section className={`shop | shoe`}>
        <Hero text="Shop" />
        <div className="container shop-section">
          <div className="title">
            <h2>{categoryTitle}</h2>
          </div>

          <div className="heading-flex">
            <div className="result">
              <span>{newFilteredData.length} Results</span>
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
            <aside className={`sidebar ${openSideBar ? 'hide' : ''}`}>
              {genderFilter && (
                <Gender
                  selectedGenders={selectedGenders}
                  setSelectedGenders={setSelectedGenders}
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
                  isSidebar={true}
                />
              )}
            </aside>

            <div className="shop-products">
              {newFilteredData &&
                newFilteredData.map((product) => {
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

export default Shop;
