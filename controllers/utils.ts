import { Response, NextFunction } from "express";

const errorHandler = (res: Response, next: NextFunction, status: number, errMessage: string) => {
    const err = new Error(errMessage);
    res.status(status);
    next(err); 
}

const isValidHttpURL = (url: string) => {
    try {
      const newUrl = new URL(url);
      return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
    } catch (err) {
      return false;
    }
  }

export { errorHandler, isValidHttpURL }