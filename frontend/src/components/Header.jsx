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
            <Navbar />

            {/* <!--NAV BUTTONS--> */}
            <div className="menu-buttons">
              <button className="toggle-search icon-btn">
                <SearchRoundedIcon className="icon" titleAccess="search" />
              </button>

              <button className="toggle-account icon-btn">
                <DarkModeRoundedIcon
                  className="icon"
                  titleAccess="toggle-mode"
                />
              </button>

              <button className="toggle-cart icon-btn">
                <ShoppingBagRoundedIcon className="icon" titleAccess="cart" />
                <span>0</span>
              </button>

              <button className="toggle-menu icon-btn">
                <MenuRoundedIcon className="icon-bar" titleAccess="Menu" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
