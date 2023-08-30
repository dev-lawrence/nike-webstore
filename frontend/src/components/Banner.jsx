import { Link } from 'react-router-dom';
import BannerImg from '../assets/banner.webp';

const Banner = () => {
  return (
    <section className="banner pt-section">
      <div className="banner-grid">
        <div className="content">
          <h2>Rewarding Days Ahead</h2>
          <p>
            More rewards for Members as we celebrate the Nike App Anniversary.
          </p>
          <p>
            From 02 - 07 Aug, stand a chance to score a pair of Nike Air Max
            “all type” when you shop on the Nike App.
          </p>
          <p>Not a Nike Member?</p>

          <Link to="/" className="btn-filled cta">
            Join now
          </Link>
        </div>

        <div className="img">
          <img src={BannerImg} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
