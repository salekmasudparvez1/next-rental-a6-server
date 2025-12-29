import { Types } from 'mongoose';
import { IUserCreate } from '../auth/auth.interface';
import { IRentalHouse } from '../landloard/landloard.interface';

export interface ITenantApplication extends Document {
  tenantId: Types.ObjectId; // references users._id with role 'tenant'
  rentalHouseId: Types.ObjectId; // references rentalHouses._id
  landloardId: Types.ObjectId; // references users._id with role 'landloard'
  status: 'pending' | 'approve' | 'reject';//will update by landloard
  date: {
    from: Date;
    to: Date;
  }
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "CANCELED";//will update by stripe 
  paymentIntentId?: string | null;

}
export interface ITenantApplicationPopulate extends
  Omit<ITenantApplication,
    "tenantId" | "rentalHouseId" | "landloardId"
  > {
  _id: Types.ObjectId;
  tenantId?: IUserCreate;
  rentalHouseId?: IRentalHouse;
  landloardId?: IUserCreate;
}