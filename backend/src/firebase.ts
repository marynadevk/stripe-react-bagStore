"use strict";

import * as admin from 'firebase-admin';
import path from 'path';
// import { ServiceAccount } from 'firebase-admin'; // For proper TypeScript typing

admin.initializeApp({
  credential: admin.credential.cert(
    path.resolve(__dirname, process.env.GOOGLE_APP_CREDENTIALS!)
  ),
});

const db = admin.firestore();
const auth = admin.auth();

export { admin, db, auth };
