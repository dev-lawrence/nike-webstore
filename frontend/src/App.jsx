import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { CartProvider } from './CartContext';

// styles
import './sass/main.scss';

// layouts
import RootLayout from './layouts/RootLayout';

// pages
import Home from './pages/Home';
import Product from './pages/Product';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="product/:slug" element={<Product />} />
    </Route>
  )
);

const App = () => {
  return (
    <>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </>
  );
};

export default App;
