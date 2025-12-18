import { Types } from 'mongoose';
export interface IAdmin {
    userId: Types.ObjectId;
    permissions?: string[];
    isSuper?: boolean;
}
export interface IRoleUpdateResponse {
    role: "tenant" | "landlord";
}
//# sourceMappingURL=admin.interface.d.ts.map