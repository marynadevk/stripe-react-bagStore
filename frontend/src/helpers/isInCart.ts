import { ICartItem, IProduct } from '../interfaces';

export const isInCart = (product: IProduct, cartItems: ICartItem[]) => {
  return cartItems.find(item => item.id === product.id);
}
