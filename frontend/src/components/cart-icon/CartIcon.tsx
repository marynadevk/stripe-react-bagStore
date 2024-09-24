import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import shoppingBag from '../../assets/bag_icon.png';
import { CartContext } from '../../context/cartContext';
import './cartIcon.styles.scss';

const CartIcon: React.FC = () => {
  const { itemCount } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className='cart-container' onClick={() => navigate('/cart')}>
      <img src={shoppingBag} alt='shopping-cart-icon' />
      {itemCount > 0 ? <span className='cart-count'>{itemCount}</span> : null}
    </div>
  );
}

export default CartIcon;