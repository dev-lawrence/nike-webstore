import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

const Footer = () => {
  return (
    <section id="footer-section">
      <div className="container">
        <div className="grid">
          <div className="row-1">
            <div className="quick-menu menu--links m-b">
              <h3>menu</h3>
              <li>
                <Link to={'/'}>find a store</Link>
              </li>
              <li>
                <Link to={'/'}>become a member</Link>
              </li>
              <li>
                <Link to={'/'}>sign up for email</Link>
              </li>
              <li>
                <Link to={'/'}>student discount</Link>
              </li>

              <li>
                <Link to={'/'}>send us feedback</Link>
              </li>
            </div>
            <div className="other-links menu--links m-b">
              <h3>helpdesk</h3>
              <li>
                <Link to={'/'}>order status</Link>
              </li>
              <li>
                <Link to={'/'}>delivery</Link>
              </li>
              <li>
                <Link to={'/'}>returns</Link>
              </li>
              <li>
                <Link to={'/'}>payment options</Link>
              </li>

              <li>
                <Link to={'/'}>contact us</Link>
              </li>
            </div>

            <div className="other-links menu--links m-b">
              <h3>about nike</h3>
              <li>
                <Link to={'/'}>news</Link>
              </li>
              <li>
                <Link to={'/'}>careers</Link>
              </li>
              <li>
                <Link to={'/'}>investors</Link>
              </li>
              <li>
                <Link to={'/'}>sustainability</Link>
              </li>
            </div>
          </div>

          <div className="row-2">
            <div className="social-links">
              <h3>primary address</h3>

              <div className="address">
                <p>One Bowerman Drive Beaverton,</p>
                <p>OR 97005-6453 USA</p>
              </div>

              <Link to={'/'}>
                <FacebookIcon />
              </Link>
              <Link to={'/'}>
                <TwitterIcon />
              </Link>

              <Link to={'/'}>
                <EmailRoundedIcon />
              </Link>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>
            Copyright © 2023 All Rights Reserved | This template is made by
            <Link to="/" className="author">
              Dev lawrence
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
