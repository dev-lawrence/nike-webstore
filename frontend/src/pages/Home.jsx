import HeroImg from '../assets/hero-image.png';
import HeroImgMobile from '../assets/hero-bg.webp';
import Category from '../components/Category';
import { Link } from 'react-router-dom';
import Featured from '../components/Featured';
import Banner from '../components/Banner';
import Popular from '../components/Popular';
import Trending from '../components/Trending';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <section className="home">
      <Helmet>
        <title>Nike webstore</title>
      </Helmet>
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

        <div className="container hero-img-mobile">
          <img src={HeroImgMobile} alt="" />
        </div>

        <p className="caption">Just do it</p>
      </div>

      <div className="container">
        <figcaption className="hero-content">
          <div>
            <h1>rediscover the world</h1>
            <p>
              Wherever you decide to run or hike, Nike Trail & Nike ACG are here
              for your next adventure
            </p>
            <Link to="shop" className="btn-filled cta">
              Shop
            </Link>
          </div>
        </figcaption>

        {/* Category section*/}
        <Category title="Category" />

        {/* Feature section */}
        <Featured title="Featured" />

        {/* Popular section */}
        <Popular title="Popular Right Now" />

        {/* Banner section */}
        <Banner title="Special Offer" />

        {/* Trending section */}
        <Trending title="Trending" />
      </div>
    </section>
  );
};

export default Home;
