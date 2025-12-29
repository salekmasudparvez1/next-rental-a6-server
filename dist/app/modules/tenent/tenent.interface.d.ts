import { Types } from 'mongoose';
import { IUserCreate } from '../auth/auth.interface';
import { IRentalHouse } from '../landloard/landloard.interface';
export interface ITenantApplication extends Document {
    tenantId: Types.ObjectId;
    rentalHouseId: Types.ObjectId;
    landloardId: Types.ObjectId;
    status: 'pending' | 'approve' | 'reject';
    date: {
        from: Date;
        to: Date;
    };
    paymentStatus: "PENDING" | "PAID" | "FAILED" | "CANCELED";
    paymentIntentId?: string | null;
}
export interface ITenantApplicationPopulate extends Omit<ITenantApplication, "tenantId" | "rentalHouseId" | "landloardId"> {
    _id: Types.ObjectId;
    tenantId?: IUserCreate;
    rentalHouseId?: IRentalHouse;
    landloardId?: IUserCreate;
}
//# sourceMappingURL=tenent.interface.d.ts.map