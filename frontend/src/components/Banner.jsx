import BannerImg from '../assets/banner.webp';
import { useClerk } from '@clerk/clerk-react';

const Banner = ({ title }) => {
  const { openSignUp } = useClerk();

  return (
    <section className="banner pt-section">
      <div className="title">
        <h2>{title}</h2>
      </div>
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

          <button className="btn-filled cta" onClick={() => openSignUp()}>
            Join now
          </button>
        </div>

        <div className="img">
          <img src={BannerImg} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
