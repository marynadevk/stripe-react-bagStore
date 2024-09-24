import React, { createContext, FC, useReducer } from 'react';
import cartReducer, { sumItems } from './cart-reducer';
import { ICartItem } from '../interfaces';

type CartState = {
  cartItems: ICartItem[];
  itemCount: number;
  total: number;
};

type CartContextType = {
  cartItems: ICartItem[];
  itemCount: number;
  total: number;
  addProduct: (product: ICartItem) => void;
  increase: (product: ICartItem) => void;
  decrease: (product: ICartItem) => void;
  removeProduct: (product: ICartItem) => void;
  clearCart: () => void;
};

const defaultCartState: CartState = {
  cartItems: [],
  itemCount: 0,
  total: 0,
};

const defaultCartContext: CartContextType = {
  ...defaultCartState,
  addProduct: () => {},
  increase: () => {},
  decrease: () => {},
  removeProduct: () => {},
  clearCart: () => {},
};

export const CartContext = createContext<CartContextType>(defaultCartContext);

type Props = {
  children: React.ReactNode;
};

const CartContextProvider: FC<Props> = ({ children }) => {
  const cartFromStorage = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart') as string)
    : [];
  const initialState = {
    cartItems: cartFromStorage,
    ...sumItems(cartFromStorage),
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addProduct = (product: ICartItem) =>
    dispatch({ type: 'ADD_ITEM', payload: product });
  const increase = (product: ICartItem) =>
    dispatch({ type: 'INCREASE', payload: product });
  const decrease = (product: ICartItem) =>
    dispatch({ type: 'DECREASE', payload: product });
  const removeProduct = (product: ICartItem) =>
    dispatch({ type: 'REMOVE_ITEM', payload: product });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const contextValues = {
    ...state,
    addProduct,
    increase,
    decrease,
    removeProduct,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
