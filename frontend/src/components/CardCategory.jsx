import { Link } from 'react-router-dom';

const CardCategory = ({
  className,
  path,
  cardImg,
  alt,
  text,
  isMenWomenOrKidCategory,
  subText,
}) => {
  return (
    <div className={className}>
      <Link
        to={path}
        className="category-content"
        onClick={() => window.scrollTo(0, 0)}
      >
        {!isMenWomenOrKidCategory && <div className="overlay"></div>}

        <img loading="lazy" src={cardImg} alt={alt} />
        <p className={!isMenWomenOrKidCategory ? 'description' : 'text'}>
          {text}
        </p>
        {isMenWomenOrKidCategory && <span className="subText">{subText}</span>}
      </Link>
    </div>
  );
};

export default CardCategory;
