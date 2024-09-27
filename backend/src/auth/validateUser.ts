import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { ICustomRequest } from '..';

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const request = req as ICustomRequest;
  const user = request.currentUser;
  if (!user) {
    return res.status(httpStatus.UNAUTHORIZED).send();
  }

  next();
};
