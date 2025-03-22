import { Model, model, Schema, Document } from 'mongoose';
import { UserRoleEnum } from '../../../../domain';

export interface UserDocument extends Document<string> {
  name: string;
  email: string;
  password: string;
  role: number;
  photoUrl?: string;
}

export const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    required: false,
  },
  role: {
    type: Number,
    required: true,
  },
});

export const UserModel: Model<UserDocument> = model<UserDocument>(
  'User',
  userSchema
);
