import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

import products from '../../data/data.js';
import Card from './Card.jsx';

const Popular = ({ title }) => {
  return (
    <section className="popular pt-section">
      <div className="d-flex">
        <div className="title">
          <h2>{title}</h2>
        </div>
      </div>

      <div className="products">
        <Splide
          options={{
            perPage: 1,
            pagination: false,
            gap: '2rem',
            drag: true,
            mediaQuery: 'min',
            speed: 800,
            breakpoints: {
              576: {
                perPage: 2,
              },

              768: {
                perPage: 3,
              },

              1200: {
                perPage: 3,
              },
            },
          }}
        >
          {products.map((product) => {
            return (
              <SplideSlide key={product.slug}>
                <Card product={product} />
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </section>
  );
};

export default Popular;
