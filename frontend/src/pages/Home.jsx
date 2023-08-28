import HeroImg from '../assets/hero-product.png';
import Category from '../components/Category';

const Home = () => {
  return (
    <section className="home">
      <div className="hero">
        <div className="bg"></div>
        <div className="hero-container">
          <div className="hero-text">
            <div className="outline">
              <h1>THE NEW 2023</h1>
            </div>

            <div className="main-text">
              <h1>AIR JORDAN</h1>
            </div>
          </div>

          <div className="hero-img">
            <img src={HeroImg} alt="" />
          </div>
        </div>

        <p className="caption">Just do it</p>
      </div>

      <div className="container">
        <Category />
      </div>
    </section>
  );
};

export default Home;
