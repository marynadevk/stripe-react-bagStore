import { useState, useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { fetchFromAPI } from '../../../helpers/fetchFromAPI';
import { ICartItem, IShippingData } from '../../../interfaces';

type Props = {
  shipping: IShippingData;
  cartItems: ICartItem[];
}

const CustomCheckout: FC<Props> = ({ shipping, cartItems }) => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [cards, setCards] = useState<any[]>([]);
  const [payment, setPaymentCard] = useState('');
  const [saveCard, setSavedCard] = useState(false);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  useEffect(() => {
    const items = cartItems.map(item => ({ price: item.price, quantity: item.quantity }));
    if (shipping) {
      const body = {
        cartItems: items,
        shipping: {
          name: shipping.name,
          address: {
            line1: shipping.address
          }
        },
        description: 'payment intent for BagGO shop',
        receipt_email: shipping.email,
      };

      const customCheckout = async () => {
        const { clientSecret, id } = await fetchFromAPI('create-payment-intent', {
          body
        });

        setClientSecret(clientSecret);
        setPaymentIntentId(id);
      };

      customCheckout();
    }
  }, [shipping, cartItems]);

  const handleCheckout = async () => {
    setProcessing(true);
    let si;
    if (saveCard) {
      si = await fetchFromAPI('save-payment-method');
    }

    if (!stripe || !elements) {
      setError('Stripe has not loaded properly.');
      setProcessing(false);
      return;
    }

    const payload = await stripe.confirmCardPayment(clientSecret!, {
      payment_method: {
        card: elements.getElement(CardNumberElement)!
      }
    });

    if (payload.error) {
      setError(`Payment Failed: ${payload.error.message}`);
    } else {
      if (saveCard && si) {
        await stripe.confirmCardSetup(si.client_secret, {
          payment_method: {
            card: elements.getElement(CardNumberElement)!
          }
        });
        navigate('/success');
      } else {
        navigate('/success');
      }
    }
  };

  const savedCardCheckout = async () => {
    setProcessing(true);
    const { clientSecret } = await fetchFromAPI('update-payment-intent', {
      body: { paymentIntentId }, method: 'PUT',
    });

    if (!stripe) {
      setError('Stripe has not loaded properly.');
      setProcessing(false);
      return;
    }
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: payment,
    });

    if (payload.error) {
      setError(`Payment Failed: ${payload.error.message}`);
      setProcessing(false);
    } else {
      navigate('/success');
    }
  };

  const cardHandleChange = (event: any) => {
    const { error } = event;
    setError(error ? error.message : '');
  };

  const cardStyle = {
    style: {
      base: {
        color: "#000",
        fontFamily: 'Roboto, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#606060",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  let cardOption;

  if (cards) {
    cardOption = cards.map(card => {
      const { card: { brand, last4, exp_month, exp_year } } = card;
      return (
        <option key={card.id} value={card.id}>
          {`${brand}/ **** **** **** ${last4} ${exp_month}/${exp_year}`}
        </option>
      );
    });
    cardOption.unshift(
      <option key='Select a card' value=''>Select A Card</option>
    );
  }

  return (
    <div>
      {
        cards && cards.length > 0 &&
        <div>
          <h4>Pay with saved card</h4>
          <select value={payment} onChange={e => setPaymentCard(e.target.value)}>
            {cardOption}
          </select>
          <button
            type='submit'
            disabled={processing || !payment}
            className='button is-black baggo-btn submit saved-card-btn'
            onClick={() => savedCardCheckout()}
          >
            {processing ? 'PROCESSING' : 'PAY WITH SAVED CARD'}
          </button>
        </div>
      }
      <h4>Enter Payment Details</h4>
      <div className='stripe-card'>
        <CardNumberElement
          className='card-element'
          options={cardStyle}
          onChange={cardHandleChange}
        />
      </div>
      <div className='stripe-card'>
        <CardExpiryElement
          className='card-element'
          options={cardStyle}
          onChange={cardHandleChange}
        />
      </div>
      <div className='stripe-card'>
        <CardCvcElement
          className='card-element'
          options={cardStyle}
          onChange={cardHandleChange}
        />
      </div>
      {
        <div className='save-card'>
          <label>Save Card</label>
          <input
            type='checkbox'
            checked={saveCard}
            onChange={e => setSavedCard(e.target.checked)}
          />
        </div>
      }
      <div className='submit-btn'>
        <button
          disabled={processing}
          className='button is-black baggo-btn submit'
          onClick={() => handleCheckout()}
        >
          {processing ? 'PROCESSING' : 'PAY'}
        </button>
      </div>
      {
        error && (<p className='error-message'>{error}</p>)
      }
    </div>
  );
};

export default CustomCheckout;