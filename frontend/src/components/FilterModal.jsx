import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SortBy from './SortBy';
import Gender from './Gender';
import ByPrice from './ByPrice';
import Color from './Color';

const FilterModal = ({
  closeModal,
  sortOption,
  handleSortChange,
  selectedGenders,
  setSelectedGenders,
  selectedPrices,
  setSelectedPrices,
  priceRanges,
  selectedColors,
  setSelectedColors,
}) => {
  return (
    <div className={`filter-modal `}>
      <div className="filter-modal-container container">
        <div className="content">
          <div className="modal-flex">
            <h3>Filter</h3>

            <button onClick={closeModal}>
              <CloseRoundedIcon className="close-icon" />
            </button>
          </div>

          {/* Sort */}
          <div className="sort">
            <SortBy
              sortOption={sortOption}
              handleSortChange={handleSortChange}
            />
          </div>

          <hr />

          {/* Gender */}
          <div className="gender">
            <Gender
              selectedGenders={selectedGenders}
              setSelectedGenders={setSelectedGenders}
            />
          </div>

          <hr />

          {/* Price */}
          <div className="price">
            <ByPrice
              selectedPrices={selectedPrices}
              setSelectedPrices={setSelectedPrices}
              priceRanges={priceRanges}
            />
          </div>

          <hr />

          {/* Price */}
          <div className="color">
            <Color
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
