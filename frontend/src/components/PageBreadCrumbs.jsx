import { Link, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const PageBreadCrumbs = () => {
  const location = useLocation();
  let currentLink = '';
  let separator = ' > ';
  const crumbs = location.pathname
    .split('/')
    .filter((crumb) => crumb !== '')
    .map((crumb) => {
      currentLink += `/${crumb}`;
      return (
        <div key={uuidv4()} className="breadcrumbs">
          <span className="crumb">{crumb}</span>
        </div>
      );
    });

  // Add home as the first crumb
  crumbs.unshift(
    <div key={uuidv4()} className="breadcrumbs">
      <Link className="home" to="/">
        <i className="fa-solid fa-house home-icon"></i> Home
      </Link>
      <span className="separator">{separator}</span>
    </div>
  );
  return <div className="breadcrumb">{crumbs}</div>;
};

export default PageBreadCrumbs;
