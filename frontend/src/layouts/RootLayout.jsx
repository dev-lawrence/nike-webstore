import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import PreHeader from '../components/PreHeader';

const RootLayout = () => {
  return (
    <>
      <PreHeader />
      <Header />
      <Outlet />
    </>
  );
};

export default RootLayout;
