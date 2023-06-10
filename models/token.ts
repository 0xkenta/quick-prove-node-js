import { Document, Schema, model } from 'mongoose';

export interface IToken extends Document {
    symbol: string;
    priceURL: string;
}

const tokenSchema = new Schema({
    symbol: {
        type: String,
        required: true,
    },
    priceURL: {
        type: String,
        required: true,
        unique: true,
    }
});

export default model<IToken>("Token", tokenSchema);