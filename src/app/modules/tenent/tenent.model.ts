import mongoose, { Schema } from 'mongoose';
import config from '../../config';
import { ITenantApplication } from './tenent.interface';

const findBasaDB = mongoose.connection.useDb(config.database_name as string);



const TenantApplicationSchema = new Schema<ITenantApplication>({
  tenantId: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
  rentalHouseId: { type: Schema.Types.ObjectId, required: true, ref: 'rentalHouses' },
  landloardId: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
  status: { type: String, enum: ['pending', 'approve', 'reject'], default: 'pending', required: true },
}, {
  timestamps: true,
  versionKey: false,
  collection: 'tenantRequests',
});

export const TenantApplicationModel = findBasaDB.model<ITenantApplication>('tenantRequests', TenantApplicationSchema);