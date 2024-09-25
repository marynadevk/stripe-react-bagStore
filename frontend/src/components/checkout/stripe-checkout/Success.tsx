import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../shared/Layout';
import { CartContext } from '../../../context/cartContext';

const Success = () => {
  const navigate = useNavigate();
  const { clearCart, cartItems } = useContext(CartContext);

  useEffect(() => {
    if (cartItems.length !== 0) {
      clearCart();
    }
  }, [clearCart, cartItems]);

  return (
    <Layout>
      <div className="checkout">
        <h1>Thank you for your order</h1>
        <p>
          We are currently processing your order and will send you a
          confirmation email shortly
        </p>
        <div>
          <button
            className="button is-black baggo-btn submit"
            onClick={() => navigate('/shop')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Success;
