interface ICartItem {
  price: number;
  quantity: number;
}

export const calculateOrderAmount = (cartItems: ICartItem[]): number => {
  return cartItems.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0) * 100;
}