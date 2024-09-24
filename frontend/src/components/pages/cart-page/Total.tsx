import React from 'react';
import { useNavigate } from 'react-router-dom';
import './total.styles.scss';

type TotalProps = {
  itemCount: number;
  total: number;
  clearCart: () => void;
};

const Total: React.FC<TotalProps> = ({ itemCount, total, clearCart }) => {
  const navigate = useNavigate();

  return (
    <div className="total-container">
      <div className="total">
        <p>Total Items: {itemCount}</p>
        <p>{`Total: $${total}`}</p>
      </div>
      <div className="checkout-btns-container">
        <button
          className="button black-btn"
          onClick={() => navigate('/checkout')}
        >
          CHECKOUT
        </button>
        <button className="button white-btn" onClick={clearCart}>
          CLEAR
        </button>
      </div>
    </div>
  );
};

export default Total;