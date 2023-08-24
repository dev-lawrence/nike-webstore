import { useState } from 'react';
import PreHeader from '../components/PreHeader';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Navbar from './Navbar';
import Logo from './Logo';
import CartList from './CartList';
import ToggleMode from './ToggleMode';
import { Link } from 'react-router-dom';

const Header = () => {
  const [navClick, setNavClick] = useState(false);
  const [cartClick, setCartClick] = useState(false);

  // Function to open the navbar
  const handleNavClick = () => {
    setNavClick(!navClick);
  };

  // Function to open the cart list
  const handleCartClick = () => {
    setCartClick(!cartClick);
  };

  return (
    <>
      <header id="header-section">
        <PreHeader />
        <div className="container">
          <div className="content d-flex">
            {/* Logo */}
            <Link href="#" className="logo">
              <Logo />
            </Link>

            {/* NAV BAR */}
            <Navbar navClick={navClick} />

            {/* <!--NAV BUTTONS--> */}
            <div className="menu-buttons">
              <button className="toggle-search icon-btn">
                <SearchRoundedIcon className="icon" titleAccess="search" />
              </button>

              <button className="toggle-mode icon-btn">
                <ToggleMode />
              </button>

              <button
                onClick={handleCartClick}
                className="toggle-cart icon-btn"
              >
                <ShoppingBagRoundedIcon className="icon" titleAccess="cart" />
                <span>0</span>
              </button>

              <button onClick={handleNavClick} className="toggle-menu icon-btn">
                {navClick ? (
                  <CloseRoundedIcon
                    className="icon-bar"
                    titleAccess="close menu"
                  />
                ) : (
                  <MenuRoundedIcon
                    className="icon-bar"
                    titleAccess="open menu"
                  />
                )}
              </button>
            </div>

            {/* Cart list */}
            <CartList cartClick={cartClick} handleCartClick={handleCartClick} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
