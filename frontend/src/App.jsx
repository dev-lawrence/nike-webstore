import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { CartProvider } from './CartContext';
import { NotificationProvider } from './NotificationContext';

// styles
import './sass/main.scss';

// layouts
import RootLayout from './layouts/RootLayout';

// pages
import Home from './pages/Home';
import Product from './pages/Product';
import Favorite from './components/Favorite';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="favorite" element={<Favorite />} />
      <Route path="product/:slug" element={<Product />} />
    </Route>
  )
);

const App = () => {
  return (
    <>
      <NotificationProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </NotificationProvider>
    </>
  );
};

export default App;
