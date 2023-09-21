import { useClerk } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useFetchData from '../hooks/useFetchData';
import Card from './Card';
import { Loading } from './Loading';
const { VITE_API_URL } = import.meta.env;

const Favorites = () => {
  const { user } = useClerk();

  const {
    data: favoriteProducts,
    loading,
    error,
  } = useFetchData(`${VITE_API_URL}/users/${user?.id}/favorites`);

  if (!favoriteProducts || favoriteProducts.length === 0) {
    return (
      <div className="pt-section | favorites | container">
        <p className="mb-1">No items saved yet.</p>
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
        {user && loading ? (
          <Loading />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <ul className="favorites-d-flex">
            {favoriteProducts.map((product) => (
              <Card key={product.slug} product={product} isFavorite={true} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Favorites;
