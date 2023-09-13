const Hero = ({ text }) => {
  return (
    <>
      <div className="bg-img">
        <div className="overlay"></div>
        <h1 className="bg-text">{text}</h1>
      </div>
    </>
  );
};

export default Hero;
