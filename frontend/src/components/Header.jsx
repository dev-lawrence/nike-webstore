import { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import Logo from '../assets/logo.svg';
import Navbar from './Navbar';

const Header = () => {
  const [navClick, setNavClick] = useState(false);

  // Function to open the navbar
  const handleNavClick = () => {
    setNavClick(!navClick);
  };

  return (
    <>
      <section id="header-section">
        <div className="container">
          <div className="content d-flex">
            {/* Logo */}
            <a href="#" className="logo">
              <img src={Logo} alt="logo" />
            </a>

            {/* NAV BAR */}
            <Navbar navClick={navClick} />

            {/* <!--NAV BUTTONS--> */}
            <div className="menu-buttons">
              <button className="toggle-search icon-btn">
                <SearchRoundedIcon className="icon" titleAccess="search" />
              </button>

              <button className="toggle-mode icon-btn">
                <DarkModeRoundedIcon
                  className="icon"
                  titleAccess="toggle-mode"
                />
              </button>

              <button className="toggle-cart icon-btn">
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
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
