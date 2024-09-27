export const envStripe = {
  secretKey: process.env.REACT_APP_PUBLISHABLE_KEY as string,
};

export const envConfig = {
  port: process.env.REACT_APP_PORT || 3000,
  apiUrl: process.env.REACT_APP_API_URL as string,
};

export const envFirebase = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN as string,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID as string,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: process.env
    .REACT_APP_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: process.env.REACT_APP_FIREBASE_APP_ID as string,
};
