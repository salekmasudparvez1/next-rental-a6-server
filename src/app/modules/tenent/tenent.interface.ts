import { Types } from 'mongoose';

export interface ITenantApplication {
  tenantId: Types.ObjectId; // references users._id with role 'tenant'
  rentalHouseId: Types.ObjectId; // references rentalHouses._id
  landloardId: Types.ObjectId; // references users._id with role 'landloard'
  status: 'pending' | 'approve' | 'reject';
}
