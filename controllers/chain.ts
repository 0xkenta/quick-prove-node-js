import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
import { isValidObjectId } from 'mongoose';
import { errorHandler } from './utils';
import Chain, { IChain } from '../models/chain';

const getAllChains = async (req: Request, res: Response) => {
    const chains = await Chain.find().sort('name').populate('nativeToken', '-_id -__v').exec();
    res.status(200).send({ chains });
};

const getChainById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (isValidObjectId(id)) {
        const chain = await Chain.findById(id).populate('nativeToken', '-_id -__v').exec();
        res.status(200).send(chain);
    } else {
        errorHandler(res, next, 404, 'CHAIN NOT FOUND');
    }
};

const addNewChain = async (req: Request, res: Response, next: NextFunction) => {
    const { name, nativeToken_id, launchedAt } = req.body;
    const isValidDate = moment(launchedAt, 'YYYY-MM-DD', true).isValid();

    if (isValidDate !== true) {
        errorHandler(res, next, 400, 'INVALID DATE');
    }

    try {
        const newChain: IChain = new Chain({
            nativeToken: nativeToken_id,
            name,
            launchedAt,
        });
        await newChain.save();
        res.status(201).json(newChain);
    } catch (err) {
        errorHandler(res, next, 400, (err as Error).message);
    }
};

export { getAllChains, getChainById, addNewChain };
