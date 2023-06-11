import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
import { errorHandler, isInWatchlist } from './utils';
import User from '../models/user';

const getAllUsers = async (req: Request, res: Response) => {
    const users = await User.find({}).sort('__v').exec();
    res.status(200).send({ users });
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;

    try {
        const newUser = new User({ username });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        errorHandler(res, next, 400, (err as Error).message);
    }
};

const addChainToWatchlist = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { chainId } = req.body;

    if (isValidObjectId(id) === false) {
        errorHandler(res, next, 404, 'USER NOT FOUND');
    }

    let user;
    try {
        user = await User.findById(id).exec();
    } catch (err) {
        errorHandler(res, next, 404, 'USER NOT FOUND');
    }

    try {
        const newWatchlist = user!.watchlist;
        const isDuplicated = isInWatchlist(newWatchlist, chainId);

        if (isDuplicated) {
            throw new Error('IS IN WATCHlIST');
        }

        newWatchlist.push(chainId);
        user!.watchlist = newWatchlist;
        user!.save();
        res.status(200).send({ user });
    } catch (err) {
        errorHandler(res, next, 400, (err as Error).message);
    }
};

export { getAllUsers, createUser, addChainToWatchlist };
