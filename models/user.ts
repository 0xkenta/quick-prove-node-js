import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
    username: string;
    watchlist: 
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    watchlist: {
        type: String,
        required: true,
        unique: true,
    }
});

export default model<IUser>("User", userSchema);