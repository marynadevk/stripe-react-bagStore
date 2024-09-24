import { Route, Routes } from 'react-router-dom';
import './App.scss';
import HomePage from './components/pages/HomePage';
import NotFound from './components/pages/NotFoundPage';
import CartPage from './components/pages/cart-page/CartPage';
import Shop from './components/pages/shop/Shop';
import SingleProduct from './components/single-product/SingleProduct';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/product/:id' element={<SingleProduct />} />
        <Route path='/cart' element={<CartPage/>} />
        {/* <Route path='/checkout' element={Checkout} /> */}
        {/* <Route path='/success' element={Success} /> */}
        {/* <Route path='canceled' element={Canceled} /> */}
        {/* <Route path='/sign-up' element={SignUp} /> */}
        {/* <Route path='/sign-in' element={SignIn} /> */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
