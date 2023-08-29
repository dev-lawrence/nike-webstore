import { Link } from 'react-router-dom';
import MenImg from '../assets/men.jpg';
import WomenImg from '../assets/women.jpg';
import KidImg from '../assets/kids.jpg';

const Category = () => {
  return (
    <section className="category pt-section">
      <div className="category-grid">
        <div className="grid-one mb">
          <Link
            to="/category/men"
            className="category-content"
            onClick={() => window.scrollTo(0, 0)}
          >
            <div className="overlay"></div>
            <img loading="lazy" src={MenImg} alt="man" />
            <p className="description">Men</p>
          </Link>
        </div>

        <div className="grid-two mb">
          <Link
            to="/category/women"
            className="category-content"
            onClick={() => window.scrollTo(0, 0)}
          >
            <div className="overlay"></div>
            <img loading="lazy" src={WomenImg} alt="woman" />
            <p className="description">Women</p>
          </Link>
        </div>

        <div className="grid-three">
          <Link
            to="/category/kids"
            className="category-content"
            onClick={() => window.scrollTo(0, 0)}
          >
            <div className="overlay"></div>
            <img loading="lazy" src={KidImg} alt="kid" />
            <p className="description">Kids</p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Category;
