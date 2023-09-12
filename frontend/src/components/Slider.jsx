import { useEffect, useRef, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';

const Slider = ({ product }) => {
  const mainRef = useRef(null);
  const thumbsRef = useRef(null);
  const [activeThumbnail, setActiveThumbnail] = useState(0);

  if (!product || !product.sizes) {
    return null;
  }

  useEffect(() => {
    if (mainRef.current && thumbsRef.current) {
      mainRef.current.sync(thumbsRef.current.splide);
    }
  }, []);

  const handleThumbnailClick = (index) => {
    if (mainRef.current && thumbsRef.current) {
      mainRef.current.go(index);
      setActiveThumbnail(index);
    }
  };

  const renderThumbnails = () => {
    return product.thumbnailImgs.map((slide, index) => (
      <SplideSlide className="thumbnail-imgs" key={slide._id}>
        <div
          className={`thumbnail ${activeThumbnail === index ? 'active' : ''}`}
          onClick={() => handleThumbnailClick(index)}
        >
          <div className={activeThumbnail === index ? 'active' : ''}></div>
          <img src={slide.img} />
        </div>
      </SplideSlide>
    ));
  };

  const mainOptions = {
    type: 'slide',
    perPage: 1,
    perMove: 1,
    gap: '.5rem',
    pagination: false,
    speed: 1000,
  };

  const thumbsOptions = {
    type: 'slide',
    rewind: true,
    drag: false,
    perPage: 5,
    gap: '.5rem',
    pagination: false,
    isNavigation: true,
    speed: 1000,
    arrows: false,
  };

  return (
    <div className="wrapper">
      <Splide options={mainOptions} ref={mainRef}>
        {product.mainImgs.map((slide) => (
          <SplideSlide className="main-img" key={slide._id}>
            {product.isHighlyRated && (
              <span className="status">
                <StarRateRoundedIcon />
                <p>Highly Rated</p>
              </span>
            )}
            <img src={slide.img} />
          </SplideSlide>
        ))}
      </Splide>

      <Splide options={thumbsOptions} ref={thumbsRef}>
        {renderThumbnails()}
      </Splide>
    </div>
  );
};

export default Slider;
