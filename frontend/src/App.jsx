import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { CartProvider } from './CartContext';
import { NotificationProvider } from './NotificationContext';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

// styles
import './sass/main.scss';

// layouts
import RootLayout from './layouts/RootLayout';
import MenLayout from './layouts/MenLayout';

// pages
import Home from './pages/Home';
import Product from './pages/Product';
import Favorite from './components/Favorite';
import Men from './pages/Men';
import Shoes from './pages/men/Shoes';
import Clothing from './pages/men/Clothing';
import Accessories from './pages/men/Accessories';
import CheckoutSuccess from './pages/CheckoutSuccess';
import Order from './pages/Order';
import NotFound from './components/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route
        path="favorite"
        element={
          <>
            <SignedIn>
              <Favorite />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />
      <Route
        path="checkout-success"
        element={
          <>
            <SignedIn>
              <CheckoutSuccess />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />

      <Route
        path="order"
        element={
          <>
            <SignedIn>
              <Order />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />
      <Route path="men" element={<Men />} />
      <Route path="m" element={<MenLayout />}>
        <Route path="shoes" element={<Shoes />} />
        <Route path="clothing" element={<Clothing />} />
        <Route path="accessories" element={<Accessories />} />
      </Route>

      <Route path="product/:slug" element={<Product />} />
      <Route path="*" element={<NotFound />} />
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
