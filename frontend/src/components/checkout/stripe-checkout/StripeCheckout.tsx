import { FormEvent, useContext, useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { CartContext } from '../../../context/cartContext';
import { fetchFromAPI } from '../../../helpers/fetchFromAPI';

const StripeCheckout = () => {
  const stripe = useStripe();
  const [email, setEmail] = useState('');
  const { cartItems } = useContext(CartContext);
  const handleGuestCheckout = async (e: FormEvent) => {
    e.preventDefault();
    const line_items = cartItems.map((item) => {
      return {
        quantity: item.quantity,
        price_data: {
          currency: 'usd',
          unit_amount: item.price * 100,
          product_data: {
            name: item.title,
            description: item.description,
            images: [item.imageUrl],
          },
        },
      };
    });

    const response = await fetchFromAPI('create-checkout-session', {
      body: { line_items, customer_email: email },
    });

    const { sessionId } = response;

    if (!stripe || !sessionId) return;

    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      throw new Error(error.message);
    }
  };

  return (
    <form onSubmit={handleGuestCheckout}>
      <div>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          value={email}
          className="baggo-input"
        />
      </div>
      <div className="submit-btn">
        <button type="submit" className="button is-black baggo-btn submit">
          Checkout
        </button>
      </div>
    </form>
  );
};

export default StripeCheckout;
