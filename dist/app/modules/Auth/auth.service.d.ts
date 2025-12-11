import { IUserCreate } from './auth.interface';
import mongoose from 'mongoose';
/**
 * Allow login using either username OR email + password.
 * - Accepts payload.email or payload.username or payload.identifier (preferred generic name).
 * - Performs case-insensitive lookup for both username and email.
 */
export declare const loginFunc: (payload: any) => Promise<{
    accessToken: string;
    refreshToken: string;
    userInfo: {
        username: string;
        email: string;
        role: "admin" | "landlord" | "tenant";
        photoURL: string;
    };
}>;
interface TUpdateDoc {
    id: string;
    action: string;
}
export declare const authService: {
    signupFunc: (registraionDoc: IUserCreate) => Promise<mongoose.Document<unknown, {}, IUserCreate, {}, mongoose.DefaultSchemaOptions> & IUserCreate & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }>;
    loginFunc: (payload: any) => Promise<{
        accessToken: string;
        refreshToken: string;
        userInfo: {
            username: string;
            email: string;
            role: "admin" | "landlord" | "tenant";
            photoURL: string;
        };
    }>;
    getAllUsersFunc: () => Promise<(mongoose.Document<unknown, {}, IUserCreate, {}, mongoose.DefaultSchemaOptions> & IUserCreate & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    statusFuc: (payload: TUpdateDoc) => Promise<(mongoose.Document<unknown, {}, IUserCreate, {}, mongoose.DefaultSchemaOptions> & IUserCreate & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }) | null | undefined>;
    updatePasswordFunc: (payload: any) => Promise<mongoose.UpdateWriteOpResult>;
    getSingleUserFunc: (email: string) => Promise<(mongoose.Document<unknown, {}, IUserCreate, {}, mongoose.DefaultSchemaOptions> & IUserCreate & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    updateNameFunc: (payload: any) => Promise<{
        name: any;
    } | {
        name?: never;
    }>;
};
export {};
//# sourceMappingURL=auth.service.d.ts.map