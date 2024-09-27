import { Request, Response, NextFunction } from 'express';
import { auth } from '../firebase';


interface CustomRequest extends Request {
  currentUser?: any;
}

export const decodeJWT = async(req: CustomRequest, _res: Response, next: NextFunction) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    const idToken = req.headers.authorization.split('Bearer ')[1];

    try {
      const decodedToken = await auth.verifyIdToken(idToken);
      req.currentUser = decodedToken;
    } catch (error) {
      console.log(error);
      throw new Error('User not authenticated');
    }
  }

  next();
}