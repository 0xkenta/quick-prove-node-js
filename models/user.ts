import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
    username: string;
    watchlist: [Schema.Types.ObjectId];
}

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    watchlist: [{ type: Schema.Types.ObjectId, ref: 'Chain' }],
});

export default model<IUser>('User', userSchema);
