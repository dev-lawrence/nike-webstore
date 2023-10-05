import { useClerk } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useFetchData from '../hooks/useFetchData.js';
import EmptyItem from '../assets/Empty-amico.png';
import Card from './Card';
import { Loading } from './Loading';
const { VITE_API_URL } = import.meta.env;
import { useState, useEffect } from 'react';

const Favorites = () => {
  const { user } = useClerk();
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  const {
    data: fetchedFavoriteProducts,
    loading,
    error,
  } = useFetchData(`${VITE_API_URL}/users/${user?.id}/favorites`);

  // Update the local state when fetched data changes
  useEffect(() => {
    if (fetchedFavoriteProducts) {
      setFavoriteProducts(fetchedFavoriteProducts);
    }
  }, [fetchedFavoriteProducts]);

  const removeFromFavorites = (productIdToRemove) => {
    // Remove the product from the local state
    const updatedFavorites = favoriteProducts.filter(
      (favProduct) => favProduct._id !== productIdToRemove
    );
    setFavoriteProducts(updatedFavorites);
  };

  if (!favoriteProducts || favoriteProducts.length === 0) {
    return (
      <div className="pt-section | favorites | container">
        <img className="empty-img" src={EmptyItem} alt="" />
        <Link className="cart-btn" to="shop">
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
      <div className="container mt-3">
        <h2>Favorites</h2>
        {user && loading ? (
          <Loading />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <ul className="favorites-d-flex">
            {favoriteProducts.map((product) => (
              <Card
                key={product.slug}
                product={product}
                isFavorite={true}
                removeFromFavorites={removeFromFavorites}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Favorites;
