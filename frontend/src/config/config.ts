export const envStripe = {
  secretKey: process.env.REACT_APP_PUBLISHABLE_KEY as string,
};

export const envConfig = {
  port: process.env.REACT_APP_PORT || 3000,
  apiUrl: process.env.REACT_APP_API_URL as string,
};