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

const Product = () => {
  const { slug } = useParams();
  const {
    data: product,
    loading,
    error,
  } = useFetchData(`${VITE_API_URL}/products/slug/${slug}`);
  const { products, addToCart } = useContext(CartContext);
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
    } else {
      setAddToCartError('Please select a size');
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
                  <button className="btn-outline">Favorite 💙</button>
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
