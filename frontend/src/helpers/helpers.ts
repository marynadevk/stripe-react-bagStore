import axios from 'axios';
import { envConfig } from '../config/config';
import { ICartItem, IProduct } from '../interfaces';

export const isInCart = (product: IProduct, cartItems: ICartItem[]) => {
  return cartItems.find(item => item.id === product.id);
}

const API = envConfig.apiUrl;

export const fetchFromAPI = async (endpoint: string, options: any = {}) => {
  const { method = 'POST', body = null } = options;

  try {
    const res = await axios({
      method,
      url: `${API}/${endpoint}`,
      data: body,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.statusText || error.message);
  }
}