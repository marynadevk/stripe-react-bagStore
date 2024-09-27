import axios from 'axios';
import { envConfig } from '../config/config';
import { auth } from '../firebase/firebase';

const API = envConfig.apiUrl;

export const fetchFromAPI = async (endpoint: string, options: any = {}) => {
  const { method = 'POST', body = {} } = options;
  const user = auth.currentUser;
  const token = user && (await user.getIdToken());
  try {
    const res = await axios({
      method,
      url: `${API}/${endpoint}`,
      data: body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.statusText || error.message);
  }
};
