import { Link } from 'react-router-dom';

const PreHeader = () => {
  return (
    <div className="pre-header">
      <div className="container">
        <div className="d-flex">
          <ul className="pre-header-nav" aria-label="list" role="list">
            <li>
              <Link to="/">guides</Link>
            </li>
            <li>
              <Link to="/">terms of sale</Link>
            </li>
            <li>
              <Link to="/">terms of use</Link>
            </li>
            <li>
              <Link to="/">privacy and policy</Link>
            </li>
          </ul>
          <ul className="pre-header-nav" aria-label="list" role="list">
            <li className="login">
              <Link to="/">login</Link>
            </li>
            <li>
              <Link to="/">register</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PreHeader;
