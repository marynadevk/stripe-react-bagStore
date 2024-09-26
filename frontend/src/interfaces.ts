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

export interface IInputValues {
  name?: string;
  email?: string;
  address?: string;
}

export interface IInputErrors {
  name?: string;
  email?: string;
  address?: string;
}

export interface IShippingData {
  name: string;
  email: string;
  address: string;
}