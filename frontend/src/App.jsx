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
import KidsLayout from './layouts/KidsLayout';
import WomenLayout from './layouts/WomenLayout';

// pages
import Home from './pages/Home';
import Product from './pages/Product';
import Favorite from './components/Favorite';
import Men from './pages/Men';
import Kids from './pages/Kids';
import Women from './pages/Women';
import CheckoutSuccess from './pages/CheckoutSuccess';
import Order from './pages/Order';
import NotFound from './components/NotFound';

// Shoes Category
import MShoes from './pages/men/MShoes';
import WShoes from './pages/women/WShoes';
import KShoes from './pages/kids/KShoes';

// Clothing Category
import MClothing from './pages/men/MClothing';
import WClothing from './pages/women/WClothing';
import KClothing from './pages/kids/KClothing';

// Accessories Category
import MAccessories from './pages/men/MAccessories';
import WAccessories from './pages/women/WAccessories';
import KAccessories from './pages/kids/KAccessories';

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
      <Route path="kids" element={<Kids />} />
      <Route path="women" element={<Women />} />

      {/* Men's Layout */}
      <Route path="m" element={<MenLayout />}>
        <Route path="shoes" element={<MShoes />} />
        <Route path="clothing" element={<MClothing />} />
        <Route path="accessories" element={<MAccessories />} />
      </Route>

      {/* Kid's layout */}
      <Route path="k" element={<KidsLayout />}>
        <Route path="shoes" element={<KShoes />} />
        <Route path="clothing" element={<KClothing />} />
        <Route path="accessories" element={<KAccessories />} />
      </Route>

      {/* Women layout */}
      <Route path="w" element={<WomenLayout />}>
        <Route path="shoes" element={<WShoes />} />
        <Route path="clothing" element={<WClothing />} />
        <Route path="accessories" element={<WAccessories />} />
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
