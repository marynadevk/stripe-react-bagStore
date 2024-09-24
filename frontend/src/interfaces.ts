export interface IProduct {
  title: string;
  imageUrl: string;
  price: number;
  id: number;
  description: string;
}

export interface ICartItem extends IProduct {
  quantity: number;
}