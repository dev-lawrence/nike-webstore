import { Link } from 'react-router-dom';
import Feature1Img from '../assets/feature1.webp';
import Feature2Img from '../assets/feature2.webp';

const Featured = ({ title }) => {
  return (
    <section className="feature pt-section">
      <div className="d-flex">
        <div className="title">
          <h2>{title}</h2>
        </div>
      </div>

      <div className="feature-grid">
        <div className="grid-one mb">
          <Link
            to="/shop"
            className="feature-content"
            onClick={() => window.scrollTo(0, 0)}
          >
            <img loading="lazy" src={Feature1Img} alt="shirt" />
            <span className="description">Quality Clothing</span>
            <button className="btn-filled">shop now</button>
          </Link>
        </div>

        <div className="grid-two">
          <Link
            to="/shop"
            className="feature-content"
            onClick={() => window.scrollTo(0, 0)}
          >
            <img loading="lazy" src={Feature2Img} alt="shoe" />
            <span className="description">Must-Have Air Max</span>
            <button className="btn-filled">shop now</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Featured;
