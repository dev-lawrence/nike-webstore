import { Link, useParams } from 'react-router-dom';
import Slider from '../components/Slider';
const { VITE_API_URL } = import.meta.env;
import useFetchData from '../hooks/useFetchData.jsx';
import { Loading } from '../components/Loading';
import SizeOptions from '../components/SizeOptions';
import { Helmet } from 'react-helmet-async';

const Product = () => {
  const { slug } = useParams();

  const {
    data: product,
    loading,
    error,
  } = useFetchData(`${VITE_API_URL}/products/slug/${slug}`);

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
                <SizeOptions product={product} />

                <div className="buttons">
                  <Link className="btn-filled">Add to Bag</Link>
                  <Link className="btn-outline">Favorite 💙</Link>
                </div>

                <div className="description-highlight">
                  <p>
                    The Air Jordan 1 Low OG remakes the classic sneaker with new
                    colors and textures. Premium materials and accents give
                    fresh expression to an all-time favorite.
                  </p>

                  <div className="full-description">
                    <button className="description-btn">
                      View Product Details
                    </button>
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
