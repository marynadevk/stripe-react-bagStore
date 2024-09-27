import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

interface CustomRequest extends Request {
  currentUser?: any;
}

export const validateUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.currentUser;
  if (!user) {
    return res.status(httpStatus.UNAUTHORIZED).send();
  }

  next();
};
