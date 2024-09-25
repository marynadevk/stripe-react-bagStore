import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import ProductsContextProvider from './context/productsContext';
import CartContextProvider from './context/cartContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import App from './App';
import { envStripe } from './config/config';

const stripePromise = loadStripe(envStripe.secretKey);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <ProductsContextProvider>
      <CartContextProvider>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </CartContextProvider>
    </ProductsContextProvider>
  </BrowserRouter>
);

reportWebVitals();
