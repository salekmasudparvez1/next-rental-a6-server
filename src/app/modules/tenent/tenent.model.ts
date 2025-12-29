import mongoose, { Schema } from 'mongoose';
import config from '../../config';
import { ITenantApplication } from './tenent.interface';
import { Signup } from '../auth/auth.model';
import { RentalHouseModel } from '../landloard/landloard.model';

const findBasaDB = mongoose.connection.useDb(config.database_name as string);



const TenantApplicationSchema = new Schema<ITenantApplication>({
  tenantId: { type: Schema.Types.ObjectId, required: true, ref: Signup.modelName },
  rentalHouseId: { type: Schema.Types.ObjectId, required: true, ref: RentalHouseModel.modelName },
  landloardId: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
  status:   { type: String, enum: ['pending', 'approve', 'reject'], default: 'pending', required: true },
  date: {
    from: { type: Date, required: true },
    to: { type: Date, required: true }
  },
  paymentStatus: { type: String, enum: ["PENDING", "PAID", "FAILED", "CANCELED"], default: 'PENDING', required: true },
  paymentIntentId: { type: String, default: null },
}, {
  timestamps: true,
  versionKey: false,
  collection: 'tenantRequests',
});

export const TenantApplicationModel = findBasaDB.model<ITenantApplication>('TenantRequests', TenantApplicationSchema);