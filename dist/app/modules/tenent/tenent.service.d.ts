import mongoose, { Types } from 'mongoose';
import { Request } from 'express';
interface RequestWithUser extends Request {
    query: {
        id?: string;
        page?: string;
        limit?: string;
    };
    userId?: Types.ObjectId;
}
export declare const getAllPropertiesPublicFunc: (req: RequestWithUser) => Promise<{
    data: {
        landloardDetails: (mongoose.Document<unknown, {}, import("../auth/auth.interface").IUserCreate, {}, mongoose.DefaultSchemaOptions> & import("../auth/auth.interface").IUserCreate & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        }) | null;
        title: string;
        location: import("../landloard/landloard.interface").ILocation;
        description: string;
        rentAmount: number;
        bedroomNumber: number;
        landloardId: Types.ObjectId;
        images: string[];
        status: "available" | "rented" | "maintenance";
        isPublished: boolean;
        features?: import("../landloard/landloard.interface").IFeature[];
        comments?: import("../landloard/landloard.interface").IComment[];
        _id: Types.ObjectId;
        __v: number;
    }[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
} | {
    data: (mongoose.Document<unknown, {}, import("../landloard/landloard.interface").IRentalHouse, {}, mongoose.DefaultSchemaOptions> & import("../landloard/landloard.interface").IRentalHouse & {
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
        id: string;
        date: {
            from: Date;
            to: Date;
        };
    }) => Promise<mongoose.Document<unknown, {}, import("./tenent.interface").ITenantApplication, {}, mongoose.DefaultSchemaOptions> & import("./tenent.interface").ITenantApplication & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    listRequestsFunc: (req: Request) => Promise<(import("./tenent.interface").ITenantApplication & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getSingleRequestByIdFunc: (req: Request) => Promise<(import("./tenent.interface").ITenantApplication & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    getSingleRequestByUserInfoFunc: (req: Request) => Promise<(import("./tenent.interface").ITenantApplication & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    getAllPropertiesPublicFunc: (req: RequestWithUser) => Promise<{
        data: {
            landloardDetails: (mongoose.Document<unknown, {}, import("../auth/auth.interface").IUserCreate, {}, mongoose.DefaultSchemaOptions> & import("../auth/auth.interface").IUserCreate & Required<{
                _id: Types.ObjectId;
            }> & {
                __v: number;
            }) | null;
            title: string;
            location: import("../landloard/landloard.interface").ILocation;
            description: string;
            rentAmount: number;
            bedroomNumber: number;
            landloardId: Types.ObjectId;
            images: string[];
            status: "available" | "rented" | "maintenance";
            isPublished: boolean;
            features?: import("../landloard/landloard.interface").IFeature[];
            comments?: import("../landloard/landloard.interface").IComment[];
            _id: Types.ObjectId;
            __v: number;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    } | {
        data: (mongoose.Document<unknown, {}, import("../landloard/landloard.interface").IRentalHouse, {}, mongoose.DefaultSchemaOptions> & import("../landloard/landloard.interface").IRentalHouse & {
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