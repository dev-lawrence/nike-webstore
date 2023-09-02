import { useParams } from 'react-router-dom';

const Product = () => {
  const { slug } = useParams();
  return <div className="pt-section">{slug}</div>;
};

export default Product;
