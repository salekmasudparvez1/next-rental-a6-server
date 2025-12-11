import { Types } from 'mongoose';
import { Request } from 'express';
export declare const tenentService: {
    createRequestFunc: (req: Request, payload: {
        rentalHouseId: string;
        status?: "pending" | "approve" | "reject";
    }) => Promise<import("mongoose").Document<unknown, {}, import("./tenent.interface").ITenantApplication, {}, import("mongoose").DefaultSchemaOptions> & import("./tenent.interface").ITenantApplication & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    listRequestsFunc: (req: Request) => Promise<(import("./tenent.interface").ITenantApplication & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
};
//# sourceMappingURL=tenent.service.d.ts.map