import { useContext } from 'react';
import CartContext from '../CartContext';
import { Helmet } from 'react-helmet-async';
import Card from './Card';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const { favorites: products } = useContext(CartContext);

  if (!products || products.length === 0) {
    return (
      <div className="pt-section | favorites | container">
        <h2>Favorites</h2>
        <p className="mb-1">No favorites selected yet.</p>
        <Link className="cart-btn" to="/">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-section">
      <Helmet>
        <title>Favorites</title>
      </Helmet>
      <div className="container">
        <h2>Favorites</h2>
        <ul>
          {products.map((product) => (
            <Card key={product.slug} product={product} isFavorite={true} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Favorites;
