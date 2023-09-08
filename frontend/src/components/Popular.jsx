import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Card from './Card.jsx';
import { Loading } from './Loading.jsx';
const { VITE_API_URL } = import.meta.env;
import useFetchData from '../hooks/useFetchData.jsx';

const Popular = ({ title }) => {
  const {
    data: products,
    loading,
    error,
  } = useFetchData(`${VITE_API_URL}/products`);

  return (
    <section className="popular pt-section">
      <div className="d-flex">
        <div className="title">
          <h2>{title}</h2>
        </div>
      </div>

      <div className="products">
        {loading ? (
          <div>
            <Loading />
          </div>
        ) : error ? (
          <div>{error}</div>
        ) : (
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
        )}
      </div>
    </section>
  );
};

export default Popular;
