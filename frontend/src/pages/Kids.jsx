import Hero from '../components/Hero';
import BigKids from '../assets/big-kids.webp';
import LittleKids from '../assets/little-kids.webp';
import BabiesToddlers from '../assets/babies-toddlers.webp';
import CardCategory from '../components/CardCategory';
import { Helmet } from 'react-helmet-async';
import Trending from '../components/Trending';

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
              <h2>Sizes for All</h2>
            </div>
          </div>

          <div className="category-grid">
            <CardCategory
              className="grid-one mb"
              path="/k/big-kids"
              cardImg={BigKids}
              alt="big-kids"
              text="Big Kids"
              subText="Explore apparel (XS-XL) and shoes (3.5-7Y)"
              isMenWomenOrKidCategory={true}
            />

            <CardCategory
              className="grid-two mb"
              path="/k/little-kids"
              cardImg={LittleKids}
              alt="little-kids"
              text="Little Kids"
              subText="Explore apparel (4-7) and shoes (10.5C-3Y)"
              isMenWomenOrKidCategory={true}
            />

            <CardCategory
              className="grid-three mb"
              path="/k/babies-toddlers"
              cardImg={BabiesToddlers}
              alt="babies and toddlers"
              text="Babies and Toddlers"
              subText="Explore apparel (0M-4T) and shoes (0C-10C)"
              isMenWomenOrKidCategory={true}
            />
          </div>
        </section>

        <Trending title="Popular items" />
      </div>
    </section>
  );
};

export default Kids;
