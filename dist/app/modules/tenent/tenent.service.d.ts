import { Types } from 'mongoose';
import { Request } from 'express';
interface RequestWithUser extends Request {
    query: {
        id?: string;
        page?: string;
        limit?: string;
    };
}
export declare const getAllPropertiesPublicFunc: (req: RequestWithUser) => Promise<{
    data: (import("mongoose").Document<unknown, {}, import("../landloard/landloard.interface").IRentalHouse, {}, import("mongoose").DefaultSchemaOptions> & import("../landloard/landloard.interface").IRentalHouse & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
}>;
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
    getAllPropertiesPublicFunc: (req: RequestWithUser) => Promise<{
        data: (import("mongoose").Document<unknown, {}, import("../landloard/landloard.interface").IRentalHouse, {}, import("mongoose").DefaultSchemaOptions> & import("../landloard/landloard.interface").IRentalHouse & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
};
export {};
//# sourceMappingURL=tenent.service.d.ts.map