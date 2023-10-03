import Hero from '../components/Hero';
import WomenShoes from '../assets/women-shoe.webp';
import WomenClothing from '../assets/women-clothing.webp';
import WomenAccessories from '../assets/women-accessories.webp';
import CardCategory from '../components/CardCategory';
import { Helmet } from 'react-helmet-async';
import Trending from '../components/Trending';

const Women = () => {
  return (
    <section className="men | kids | women">
      <Helmet>
        <title>Women's Shoes, Clothing & Accessories</title>
      </Helmet>
      <Hero text="Women" />
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
              path="/w/shoes"
              cardImg={WomenShoes}
              alt="shoe"
              text="Shoes"
              isMenWomenOrKidCategory={true}
            />

            <CardCategory
              className="grid-two mb"
              path="/w/clothing"
              cardImg={WomenClothing}
              alt="clothing"
              text="Clothing"
              isMenWomenOrKidCategory={true}
            />

            <CardCategory
              className="grid-three mb"
              path="/w/accessories"
              cardImg={WomenAccessories}
              alt="accessories"
              text="Accessories"
              isMenWomenOrKidCategory={true}
            />
          </div>
        </section>

        <Trending title="Popular items" />
      </div>
    </section>
  );
};

export default Women;
