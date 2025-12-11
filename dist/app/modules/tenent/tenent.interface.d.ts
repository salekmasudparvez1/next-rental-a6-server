import { Types } from 'mongoose';
export interface ITenantApplication {
    tenantId: Types.ObjectId;
    rentalHouseId: Types.ObjectId;
    landloardId: Types.ObjectId;
    status: 'pending' | 'approve' | 'reject';
}
//# sourceMappingURL=tenent.interface.d.ts.map