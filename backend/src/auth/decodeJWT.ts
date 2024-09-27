import { Request, Response, NextFunction } from 'express';
import { auth } from '../firebase';
import { ICustomRequest } from '..';

export const decodeJWT = async(req: Request, _res: Response, next: NextFunction) => {
  const request = req as ICustomRequest;
  if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
    const idToken = request.headers.authorization.split('Bearer ')[1];

    try {
      const decodedToken = await auth.verifyIdToken(idToken);
      request.currentUser = decodedToken;
    } catch (error) {
      console.log(error);
      throw new Error('User not authenticated');
    }
  }

  next();
}