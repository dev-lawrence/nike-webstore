import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RootLayout = () => {
  const location = useLocation();
  const isShopPage = location.pathname.startsWith('/m/shoes');

  return (
    <>
      <Header />
      <Outlet />
      <Footer isShopPage={isShopPage} />
    </>
  );
};

export default RootLayout;
