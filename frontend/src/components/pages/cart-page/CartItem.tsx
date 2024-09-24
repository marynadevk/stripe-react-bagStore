import React from 'react';
import { PlusCircleIcon, MinusCircleIcon, TrashIcon } from '../../icons/Icons';
import { ICartItem } from '../../../interfaces';

type CartItemProps = {
  title: string;
  imageUrl?: string;
  price: number;
  quantity: number;
  id: number;
  description?: string;
  increase: (product: ICartItem) => void;
  decrease: (product: ICartItem) => void;
  removeProduct: (product: ICartItem) => void;
};

const CartItem: React.FC<CartItemProps> = (props) => {
  const {
    title,
    imageUrl,
    price,
    quantity,
    id,
    description,
    increase,
    decrease,
    removeProduct,
  } = props;
  const product = { 
    title, 
    imageUrl: imageUrl || '', 
    price, 
    quantity, 
    id, 
    description: description || '', 
    increase, 
    decrease 
  };

  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={imageUrl} alt="product" />
      </div>
      <div className="name-price">
        <h4>{title}</h4>
        <p>${price}</p>
      </div>
      <div className="quantity">
        <p>{`Quantity: ${quantity}`}</p>
      </div>
      <div className="btns-container">
        <button className="btn-increase" onClick={() => increase(product)}>
          <PlusCircleIcon width="20px" />
        </button>
        {quantity === 1 && (
          <button className="btn-trash" onClick={() => removeProduct(product)}>
            <TrashIcon width="20px" />
          </button>
        )}
        {quantity > 1 && (
          <button className="btn-decrease" onClick={() => decrease(product)}>
            <MinusCircleIcon width="20px" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
