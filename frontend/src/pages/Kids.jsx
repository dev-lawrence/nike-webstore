import Hero from '../components/Hero';
import KidsShoes from '../assets/kids-shoe.webp';
import KidsClothing from '../assets/kids-clothing.webp';
import KidsAccessories from '../assets/kids-accessories.webp';
import CardCategory from '../components/CardCategory';
import { Helmet } from 'react-helmet-async';

const Kids = () => {
  return (
    <section className="men | kids">
      <Helmet>
        <title>Kids Shoes, Clothing & Accessories</title>
      </Helmet>
      <Hero text="Kids" />
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
              path="/k/shoes"
              cardImg={KidsShoes}
              alt="shoe"
              text="Shoes"
              isMenWomenOrKidCategory={true}
            />

            <CardCategory
              className="grid-two mb"
              path="/k/clothing"
              cardImg={KidsClothing}
              alt="clothing"
              text="Clothing"
              isMenWomenOrKidCategory={true}
            />

            <CardCategory
              className="grid-three mb"
              path="/k/accessories"
              cardImg={KidsAccessories}
              alt="accessories"
              text="Accessories"
              isMenWomenOrKidCategory={true}
            />
          </div>
        </section>
      </div>
    </section>
  );
};

export default Kids;
