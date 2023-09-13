import MenImg from '../assets/men.webp';
import WomenImg from '../assets/women.webp';
import KidImg from '../assets/kids.webp';
import CardCategory from './CardCategory';

const Category = ({ title }) => {
  return (
    <section className="category pt-section">
      <div className="d-flex">
        <div className="title">
          <h2>{title}</h2>
        </div>
      </div>
      <div className="category-grid">
        <CardCategory
          className="grid-one mb"
          path="men"
          cardImg={MenImg}
          alt="man"
          text="Men"
        />

        <CardCategory
          className="grid-two mb"
          path="/category/women"
          cardImg={WomenImg}
          alt="woman"
          text="Women"
        />

        <CardCategory
          className="grid-three mb"
          path="/category/kids"
          cardImg={KidImg}
          alt="kid"
          text="Kids"
        />
      </div>
    </section>
  );
};

export default Category;
