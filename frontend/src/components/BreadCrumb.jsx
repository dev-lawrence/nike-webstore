import { Link, useLocation } from 'react-router-dom';
const { VITE_API_URL } = import.meta.env;
import useFetchData from '../hooks/useFetchData';
import { v4 as uuidv4 } from 'uuid';

const BreadCrumbs = ({ slug }) => {
  const location = useLocation();
  const { data: product } = useFetchData(
    `${VITE_API_URL}/products/slug/${slug}`
  );
  let currentLink = '';
  let separator = ' > ';
  const crumbs = location.pathname
    .split('/')
    .filter((crumb) => crumb !== '')
    .map((crumb, index, array) => {
      currentLink += `/${crumb}`;
      // Check if it's the last crumb in the array
      if (index === array.length - 1) {
        return (
          <div key={uuidv4()} className="breadcrumbs">
            {product?.category && (
              <>
                <span className="category">{product?.category}'s</span>
                <span className="separator">{separator}</span>
              </>
            )}
            <span className="crumb">{product?.name || crumb}</span>
          </div>
        );
      }
      // Check if it's the product page
      if (crumb === 'product') {
        return null;
      }
    });
  const additionalCrumb = (
    <div key={uuidv4()} className="breadcrumbs">
      <Link className="home" to="/">
        <i className="fa-solid fa-house home-icon"></i> Home
      </Link>
      <span className="separator">{separator}</span>
    </div>
  );
  // Add the additional breadcrumb to the beginning of the breadcrumbs arrays
  crumbs.unshift(additionalCrumb);
  return <div>{crumbs}</div>;
};

export default BreadCrumbs;
