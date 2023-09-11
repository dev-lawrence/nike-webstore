import { useState, useRef } from 'react';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import Navbar from './Navbar';
import Logo from './Logo';
import CartList from './CartList';
import CartContext from '../CartContext';
import ToggleMode from './ToggleMode';
import { Link } from 'react-router-dom';
import Search from './Search';
import { useContext } from 'react';

const Header = () => {
  const { products } = useContext(CartContext);
  const [navClick, setNavClick] = useState(false);
  const [cartClick, setCartClick] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [searchClick, setSearchClick] = useState(false);
  const inputRef = useRef();

  // Function to open the navbar
  const handleNavClick = () => {
    setNavClick(!navClick);
    setOverlay((prevOverlay) => !prevOverlay);
  };

  // Function to open the cart list
  const handleCartClick = () => {
    setCartClick(!cartClick);
    setOverlay((prevOverlay) => !prevOverlay);
  };

  // Function to open the search menu
  const handleSearchClick = () => {
    setSearchClick(!searchClick);
    inputRef.current.focus();
  };

  return (
    <>
      <header id="header-section">
        <div className={`overlay ${overlay ? 'show-overlay' : ''}`}></div>

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
              <Search
                searchClick={searchClick}
                handleSearchClick={handleSearchClick}
                inputRef={inputRef}
              />

              <button className="toggle-mode icon-btn">
                <ToggleMode />
              </button>

              <button
                onClick={handleCartClick}
                className="toggle-cart icon-btn"
              >
                <ShoppingBagRoundedIcon className="icon" titleAccess="cart" />
                {products.length >= 1 && <span>{products.length}</span>}
              </button>

              <button onClick={handleNavClick} className="toggle-menu icon-btn">
                {navClick ? (
                  <CloseRoundedIcon
                    className="icon-bar close-menu"
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
