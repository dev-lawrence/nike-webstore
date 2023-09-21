import { useParams } from 'react-router-dom';
import Slider from '../components/Slider';
const { VITE_API_URL } = import.meta.env;
import useFetchData from '../hooks/useFetchData.jsx';
import { Loading } from '../components/Loading';
import SizeOptions from '../components/SizeOptions';
import { Helmet } from 'react-helmet-async';
import Modal from '../components/Modal';
import { useContext, useState } from 'react';
import CartContext from '../CartContext';
import NotificationContext from '../NotificationContext';
import { useClerk } from '@clerk/clerk-react';
import axios from 'axios';

const Product = () => {
  const { user, openSignIn } = useClerk();

  const { slug } = useParams();
  const {
    data: product,
    loading,
    error,
  } = useFetchData(`${VITE_API_URL}/products/slug/${slug}`);
  const { addToCart, addToFavorites } = useContext(CartContext);
  const { showNotify } = useContext(NotificationContext);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [addToCartError, setAddToCartError] = useState(null);

  // Function to add all items to cart
  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(
        product.slug,
        product.name,
        product.price,
        product.image,
        selectedSize
      );

      showNotify;
    } else {
      setAddToCartError('Please select a size');
    }
  };

  // Function to toggle a product as a favorite
  const handleAddToFavorite = () => {
    if (user) {
      const favoriteProduct = {
        productId: product._id,
        slug: product.slug,
        name: product.name,
        subName: product.subName,
        price: product.price,
        image: product.image,
      };

      axios
        .post(`${VITE_API_URL}/users/${user.id}/favorites`, favoriteProduct)
        .then((response) => {
          if (response.status === 200) {
            showNotify('Added to Favorites');

            addToFavorites(
              product.slug,
              product.name,
              product.subName,
              product.price,
              product.image
            );
          } else {
            showNotify('Already in Favorites');
          }
        })
        .catch((error) => {
          console.error('Error adding product to favorites:', error);
        });
    } else {
      openSignIn();
    }
  };

  // Function to toggle the modal and body scroll
  const toggleModal = () => {
    setOpenModal(!openModal);
    if (!openModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  };

  return (
    <section className="product-page pt-section">
      {loading ? (
        <Loading />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="container">
          <div className="content d-flex | d-grid">
            <div className="title | mobile-title">
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h2>{product.name}</h2>
              <p className="sub-name">{product.subName}</p>
              <p className="price">${product.price}</p>
            </div>
            <div className="img">
              <Slider product={product} />
            </div>
            <div>
              <div className="title | desktop-title">
                <h2>{product.name}</h2>
                <p className="sub-name">{product.subName}</p>
                <p className="price">${product.price}</p>
              </div>
              <div className="details">
                <SizeOptions
                  product={product}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                  addToCartError={addToCartError}
                  setAddToCartError={setAddToCartError}
                />

                {addToCartError && (
                  <div className="size-error">{addToCartError}</div>
                )}

                <div className="buttons">
                  <button className="btn-filled" onClick={handleAddToCart}>
                    Add to Bag
                  </button>
                  <button className="btn-outline" onClick={handleAddToFavorite}>
                    Favorite 💙
                  </button>
                </div>

                <div className="description-highlight">
                  <p>{product.description}</p>

                  <div className="full-description">
                    <button onClick={toggleModal} className="description-btn">
                      View Product Details
                    </button>

                    {openModal && (
                      <Modal
                        openModal={openModal}
                        closeModal={toggleModal}
                        product={product}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Product;
