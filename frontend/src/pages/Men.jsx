import Hero from '../components/Hero';
import MenShoes from '../assets/men-shoe.webp';
import MenClothing from '../assets/men-clothing.webp';
import MenAccessories from '../assets/men-accessories.webp';
import CardCategory from '../components/CardCategory';
import { Helmet } from 'react-helmet-async';
import Trending from '../components/Trending';

const Men = () => {
  return (
    <section className="men">
      <Helmet>
        <title>Men's Shoes, Clothing & Accessories</title>
      </Helmet>
      <Hero text="Men" />
      <div className="container">
        <section className="category pt-section">
          <div className="d-flex">
            <div className="title">
              <h2>Shop the Essentials</h2>
            </div>
          </div>
          <div className="category-grid">
            <CardCategory
              className="grid-one mb"
              path="/m/shoes"
              cardImg={MenShoes}
              alt="shoe"
              text="Shoes"
              isMenWomenOrKidCategory={true}
            />

            <CardCategory
              className="grid-two mb"
              path="/m/clothing"
              cardImg={MenClothing}
              alt="clothing"
              text="Clothing"
              isMenWomenOrKidCategory={true}
            />

            <CardCategory
              className="grid-three mb"
              path="/m/accessories"
              cardImg={MenAccessories}
              alt="accessories"
              text="Accessories"
              isMenWomenOrKidCategory={true}
            />
          </div>
        </section>

        <Trending title="Products you might like" />
      </div>
    </section>
  );
};

export default Men;
