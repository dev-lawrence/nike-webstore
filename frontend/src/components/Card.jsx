import { Link } from 'react-router-dom';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useContext } from 'react';
import NotificationContext from '../NotificationContext';
import { useClerk } from '@clerk/clerk-react';
const { VITE_API_URL } = import.meta.env;
import axios from 'axios';

const Card = ({ product, isFavorite, isSearchedItems }) => {
  const { name, justIn, slug, image, subName, price } = product;
  const { showNotify } = useContext(NotificationContext);
  const { user } = useClerk();

  const handleRemoveFromFavorites = () => {
    if (user) {
      axios
        .delete(`${VITE_API_URL}/users/${user.id}/favorites/${product._id}`)
        .then((response) => {
          if (response.status === 200) {
            showNotify(`Removed "${product.name}" from favorites.`);
          } else {
            showNotify(`Product "${product.name}" not found in favorites.`);
          }
        })
        .catch((error) => {
          console.error('Error removing product from favorites:', error);
        });
    }
  };

  return (
    <div
      className={`product ${
        isFavorite ? 'favorite' : isSearchedItems ? 'search-item' : ''
      }`}
    >
      {justIn && <span className="status">Just In</span>}

      <Link
        to={`/product/${slug}`}
        onClick={() => window.scrollTo(0, 0)}
        className="preview"
      >
        <img src={image} alt={subName} />
      </Link>

      <div className="description">
        <div className="description-content">
          <h5 className="name">{name}</h5>
          <p className="sub-name">{subName}</p>
          <h4 className="price">${price}</h4>
        </div>

        {isFavorite && (
          <button onClick={handleRemoveFromFavorites}>
            <DeleteRoundedIcon className="delete" />
          </button>
        )}

        {!isFavorite && !isSearchedItems && (
          <button>
            <span className="cart">
              <ShoppingCartRoundedIcon />
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
