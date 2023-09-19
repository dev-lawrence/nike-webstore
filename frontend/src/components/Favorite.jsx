import { useContext, useEffect, useState } from 'react';
import CartContext from '../CartContext';
import { Helmet } from 'react-helmet-async';
import Card from './Card';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useClerk } from '@clerk/clerk-react';
const { VITE_API_URL } = import.meta.env;

const Favorites = () => {
  const { user } = useClerk();
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(`${VITE_API_URL}/user/${user.id}/favorites`)
        .then((response) => {
          setFavoriteProducts(response.data);
        })
        .catch((error) => {
          console.error('Error fetching favorite products', error);
        });
    }
  }, [user]);

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
        <ul className="favorites-d-flex">
          {favoriteProducts.map((product) => (
            <Card key={product.slug} product={product} isFavorite={true} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Favorites;

// REAL CODE
// import { useContext } from 'react';
// import CartContext from '../CartContext';
// import { Helmet } from 'react-helmet-async';
// import Card from './Card';
// import { Link } from 'react-router-dom';

// const Favorites = () => {
//   const { favorites: products } = useContext(CartContext);

//   if (!products || products.length === 0) {
//     return (
//       <div className="pt-section | favorites | container">
//         <p className="mb-1">No items saved yet.</p>
//         <Link className="cart-btn" to="/">
//           Continue Shopping
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="pt-section">
//       <Helmet>
//         <title>Favorites</title>
//       </Helmet>
//       <div className="container">
//         <h2>Favorites</h2>
//         <ul className="favorites-d-flex">
//           {products.map((product) => (
//             <Card key={product.slug} product={product} isFavorite={true} />
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Favorites;
