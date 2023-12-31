import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import Slider from '../components/Slider';
const { VITE_API_URL } = import.meta.env;
import useFetchData from '../hooks/useFetchData.js';
import SizeOptions from '../components/SizeOptions';
import { Helmet } from 'react-helmet-async';
import Modal from '../components/Modal';
import CartContext from '../CartContext';
import NotificationContext from '../NotificationContext';
import { useClerk } from '@clerk/clerk-react';
import axios from 'axios';
import Trending from '../components/Trending';
import SkeletonProduct from '../components/Skeleton/SkeletonProduct';
import BreadCrumbs from '../components/BreadCrumb';
import Reviews from '../components/Reviews';

const Product = () => {
  const { user, openSignIn } = useClerk();

  const { slug } = useParams();

  // Fetch product data based on the slug
  const {
    data: product,
    loading,
    error,
  } = useFetchData(`${VITE_API_URL}/products/slug/${slug}`);

  // State variables for managing component state
  const [openModal, setOpenModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [addToCartError, setAddToCartError] = useState(null);
  const [showReviews, setShowReviews] = useState(false);

  // Contexts for managing cart and notifications
  const { addToCart } = useContext(CartContext);
  const { showNotify } = useContext(NotificationContext);

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

      // Add the product to user favorites
      axios
        .post(`${VITE_API_URL}/users/${user.id}/favorites`, favoriteProduct)
        .then((response) => {
          if (response.status === 200) {
            if (response.data.message === 'Product added to favorites') {
              showNotify('Added to Favorites');
            } else if (
              response.data.message === 'Product already in favorites'
            ) {
              showNotify('Already in Favorites');
            }
          }
        })
        .catch((error) => {
          console.error('Error adding product to favorites:', error);
        });
    } else {
      // Open sign-in modal if the user is not authenticated
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

  // Function to toggle show Reviews
  const handleToggleReviews = () => {
    setShowReviews(!showReviews);
  };

  return (
    <section className="product-page pt-section">
      {loading ? (
        <>
          <div className="container">
            <SkeletonProduct />
          </div>
        </>
      ) : error ? (
        <div className="container">
          <SkeletonProduct />
        </div>
      ) : (
        <div className="container">
          <BreadCrumbs slug={slug} />
          <hr className="breadcrumbs-line" />
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
                  <button
                    className="btn-filled | w-full"
                    onClick={handleAddToCart}
                  >
                    Add to Bag
                  </button>
                  <button
                    className="btn-outline | w-full"
                    onClick={handleAddToFavorite}
                  >
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

                <hr className="mt-3" />

                <div className="reviews">
                  <Reviews
                    product={product}
                    handleToggleReviews={handleToggleReviews}
                    showReviews={showReviews}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Trending product */}
          <Trending title="You Might Also Like" isProduct={true} />
        </div>
      )}
    </section>
  );
};

export default Product;
