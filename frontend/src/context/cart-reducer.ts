import { ICartItem } from '../interfaces';

type CartState = {
  cartItems: ICartItem[];
  itemCount: number;
  total: number;
};

type Action =
  | { type: 'ADD_ITEM'; payload: ICartItem }
  | { type: 'INCREASE'; payload: ICartItem }
  | { type: 'DECREASE'; payload: ICartItem }
  | { type: 'REMOVE_ITEM'; payload: ICartItem }
  | { type: 'CLEAR' };

const storeCartItems = (cartItems: ICartItem[]): void => {
  const cart = cartItems.length > 0 ? cartItems : [];
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const sumItems = (
  cartItems: ICartItem[]
): { itemCount: number; total: number } => {
  storeCartItems(cartItems);
  return {
    itemCount: cartItems.reduce((total, prod) => total + prod.quantity, 0),
    total: cartItems.reduce(
      (total, prod) => total + prod.price * prod.quantity,
      0
    ),
  };
};

const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      if (!state.cartItems.find((item) => item.id === action.payload.id)) {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }

      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems),
      };
    case 'INCREASE':
      const increaseIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartItems[increaseIndex].quantity++;

      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems),
      };
    case 'DECREASE':
      const decreaseIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      const product = state.cartItems[decreaseIndex];
      if (product.quantity > 1) {
        product.quantity--;
      }

      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems),
      };
    case 'REMOVE_ITEM':
      const newCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        cartItems: [...newCartItems],
        ...sumItems(newCartItems),
      };
    case 'CLEAR':
      localStorage.removeItem('cart');
      return {
        cartItems: [],
        itemCount: 0,
        total: 0,
      };
    default:
      return state;
  }
};

export default cartReducer;
