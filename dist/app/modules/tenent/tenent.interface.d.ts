import { Types } from 'mongoose';
export interface ITenantApplication {
    tenantId: Types.ObjectId;
    rentalHouseId: Types.ObjectId;
    landloardId: Types.ObjectId;
    status: 'pending' | 'approve' | 'reject';
    date: {
        from: Date;
        to: Date;
    };
}
//# sourceMappingURL=tenent.interface.d.ts.map