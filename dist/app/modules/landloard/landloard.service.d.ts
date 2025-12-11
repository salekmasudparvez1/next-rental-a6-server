import { Request } from "express";
import { Types } from "mongoose";
export declare const landloardService: {
    createPropertiesFunc: (data: any, files: Express.Multer.File[], userId: string) => Promise<import("mongoose").Document<unknown, {}, import("./landloard.interface").IRentalHouse, {}, import("mongoose").DefaultSchemaOptions> & import("./landloard.interface").IRentalHouse & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllPropertiesFunc: (req: Request) => Promise<(import("mongoose").Document<unknown, {}, import("./landloard.interface").IRentalHouse, {}, import("mongoose").DefaultSchemaOptions> & import("./landloard.interface").IRentalHouse & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    updatePropertiesFunc: (req: Request) => Promise<(import("mongoose").Document<unknown, {}, import("./landloard.interface").IRentalHouse, {}, import("mongoose").DefaultSchemaOptions> & import("./landloard.interface").IRentalHouse & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deletePropertiesFunc: (req: Request) => Promise<(import("mongoose").Document<unknown, {}, import("./landloard.interface").IRentalHouse, {}, import("mongoose").DefaultSchemaOptions> & import("./landloard.interface").IRentalHouse & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    getAllRequestsFunc: (req: Request) => Promise<(import("mongoose").Document<unknown, {}, import("../tenent/tenent.interface").ITenantApplication, {}, import("mongoose").DefaultSchemaOptions> & import("../tenent/tenent.interface").ITenantApplication & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    updateRequestFunc: (req: Request) => Promise<(import("mongoose").Document<unknown, {}, import("../tenent/tenent.interface").ITenantApplication, {}, import("mongoose").DefaultSchemaOptions> & import("../tenent/tenent.interface").ITenantApplication & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
};
//# sourceMappingURL=landloard.service.d.ts.map