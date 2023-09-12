import { Link } from 'react-router-dom';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useContext } from 'react';
import CartContext from '../CartContext';
const Card = ({ product, isFavorite }) => {
  const { name, justIn, slug, image, subName, price } = product;
  const { removeFromFavorites } = useContext(CartContext);
  return (
    <div className={`product ${isFavorite ? 'favorite' : ''}`}>
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
          <button onClick={() => removeFromFavorites(slug)}>
            <DeleteRoundedIcon className="delete" />
          </button>
        )}

        <button>
          <span className="cart">
            <ShoppingCartRoundedIcon />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Card;
