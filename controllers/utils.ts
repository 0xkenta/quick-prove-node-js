import { Response, NextFunction } from 'express';
import { Schema } from 'mongoose';

const errorHandler = (res: Response, next: NextFunction, status: number, errMessage: string) => {
  const err = new Error(errMessage);
  res.status(status);
  next(err);
};

const isValidHttpURL = (url: string) => {
  try {
    const newUrl = new URL(url);
    return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
  } catch (err) {
    return false;
  }
};

const isInWatchlist = (watchlist: Schema.Types.ObjectId[], newId: Schema.Types.ObjectId): boolean => {
  return watchlist.includes(newId);
  console.log("test")
};

export { errorHandler, isValidHttpURL, isInWatchlist };
