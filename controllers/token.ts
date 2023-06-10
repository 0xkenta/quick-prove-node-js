import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import { errorHandler, isValidHttpURL } from "./utils";
import Token, { IToken } from "../models/token";

const getAllTokens = async (req: Request, res: Response) => {
    const tokens = await Token.find({}).sort("symbol").exec();
    res.status(200).send({tokens});       
}

const getTokenById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    
    if (isValidObjectId(id)) {
        const token = await Token.findById(id);
        res.status(200).send(token);       
    } else {
        errorHandler(res, next, 404, "TOKEN NOT FOUND");
    }        
}

const addNewToken = async (req: Request, res: Response, next: NextFunction) => {
    const { symbol, priceURL } = req.body;

    if (isValidHttpURL(priceURL)) {
        const newToken: IToken = new Token({ symbol, priceURL });
        await newToken.save();
        res.status(201).json(newToken);
    } else {
        errorHandler(res, next, 400, 'INVALID PRICE URL');
    } 
}

export { addNewToken, getAllTokens, getTokenById }

