import { useEffect, useRef, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import MenImg from '../assets/men.webp';
import WomenImg from '../assets/women.webp';
import KidImg from '../assets/kids.webp';

const slides = [
  { src: MenImg, alt: 'Men Shoes' },
  { src: WomenImg, alt: 'Women Shoes' },
  { src: KidImg, alt: 'Kids Shoes' },
];

const Slider = () => {
  const mainRef = useRef(null);
  const thumbsRef = useRef(null);
  const [activeThumbnail, setActiveThumbnail] = useState(0);

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
    return slides.map((slide, index) => (
      <SplideSlide key={slide.src}>
        <div
          className={`thumbnail ${activeThumbnail === index ? 'active' : ''}`}
          onClick={() => handleThumbnailClick(index)}
        >
          <div className={activeThumbnail === index ? 'active' : ''}></div>
          <img src={slide.src} alt={slide.alt} />
        </div>
      </SplideSlide>
    ));
  };

  const mainOptions = {
    type: 'slide',
    perPage: 1,
    perMove: 1,
    gap: '1rem',
    pagination: false,
    speed: 1000,
  };

  const thumbsOptions = {
    type: 'slide',
    rewind: true,
    drag: false,
    perPage: 3,
    gap: '0rem',
    pagination: false,
    isNavigation: true,
    speed: 1000,
    arrows: false,
  };

  return (
    <div className="wrapper">
      <Splide options={mainOptions} ref={mainRef}>
        {slides.map((slide) => (
          <SplideSlide key={slide.src}>
            <img src={slide.src} alt={slide.alt} />
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
