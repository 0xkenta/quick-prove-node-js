import { Document, Schema, model } from 'mongoose';

export interface IChain extends Document {
  name: string;
  nativeToken: Schema.Types.ObjectId;
  launchedAt: Date;
}

const chainSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  nativeToken: {
    type: Schema.Types.ObjectId,
    ref: 'Token',
  },
  launchedAt: {
    type: Date,
    required: true,
  },
});

export default model<IChain>('Chain', chainSchema);
