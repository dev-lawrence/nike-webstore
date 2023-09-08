import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Slider from '../components/Slider';

const Product = () => {
  const { slug } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);

  // function to select size
  const handleSelectedSize = (event) => {
    setSelectedSize(event.target.value);
  };

  return (
    <section className="product-page pt-section">
      <div className="container">
        <div className="content d-flex | d-grid">
          <div className="title | mobile-title">
            <h2>Air jordan 1 low og</h2>
            <p className="sub-cat">shoes</p>
            <p className="price">$140</p>
          </div>
          <div className="img">
            <Slider />
          </div>
          <div>
            <div className="title | desktop-title">
              <h2>Air jordan 1 low og</h2>
              <p className="sub-cat">shoes</p>
              <p className="price">$140</p>
            </div>
            <div className="details">
              <div className="shoe-sizes">
                <h4>Select size</h4>
                <div className="shoe">
                  <div className="size">
                    <input
                      type="radio"
                      className="radio_input"
                      name="shoe_size"
                      id="size_7"
                      value="7"
                      onChange={handleSelectedSize}
                    />
                    <label
                      htmlFor="size_7"
                      className={selectedSize === '7' ? 'line' : ''}
                    >
                      M 3.5 / W 5
                    </label>
                  </div>

                  <div className="size">
                    <input
                      type="radio"
                      className="radio_input"
                      name="shoe_size"
                      id="size_6"
                      value="6"
                      onChange={handleSelectedSize}
                    />
                    <label
                      htmlFor="size_6"
                      className={selectedSize === '6' ? 'line' : ''}
                    >
                      M 3.5 / W 5
                    </label>
                  </div>

                  <div className="size">
                    <input
                      type="radio"
                      className="radio_input"
                      name="shoe_size"
                      id="size_5"
                      value="5"
                      onChange={handleSelectedSize}
                    />
                    <label
                      htmlFor="size_5"
                      className={selectedSize === '5' ? 'line' : ''}
                    >
                      M 3.5 / W 5
                    </label>
                  </div>
                </div>
              </div>

              <div className="buttons">
                <Link className="btn-filled">Add to Bag</Link>
                <Link className="btn-outline">Favorite 💙</Link>
              </div>

              <div className="description-highlight">
                <p>
                  The Air Jordan 1 Low OG remakes the classic sneaker with new
                  colors and textures. Premium materials and accents give fresh
                  expression to an all-time favorite.
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
    </section>
  );
};

export default Product;
