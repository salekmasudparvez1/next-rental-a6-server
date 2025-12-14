import mongoose, { Schema, Types } from 'mongoose';
import config from '../../config';
import { IAdmin } from './admin.interface';

const db = mongoose.connection.useDb(config.database_name as string);

const AdminSchema = new Schema<IAdmin>(
  {
    userId: { type: Types.ObjectId, required: true, unique: true, ref: 'users' },
    permissions: { type: [String], default: [] },
    isSuper: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'admins',
  },
);

export const AdminModel = db.model<IAdmin>('admins', AdminSchema);
