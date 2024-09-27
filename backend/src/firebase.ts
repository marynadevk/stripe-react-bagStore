import * as admin from 'firebase-admin';
import { envFirebase } from './config/config';


admin.initializeApp({
  credential: admin.credential.cert(envFirebase as admin.ServiceAccount),
});

const db = admin.firestore();
const auth = admin.auth();

export { admin, db, auth };

console.log('!!!!!!!!!!!________Firebase initialized', admin);