import { IUserCreate } from './auth.interface';
import mongoose from 'mongoose';
interface TUpdateDoc {
    id: string;
    action: string;
}
export declare const authService: {
    signupFunc: (registrationDoc: IUserCreate) => Promise<{
        accessToken: string;
        refreshToken: string;
        userInfo: {
            username: string;
            email: string;
            role: "admin" | "landlord" | "tenant";
            photoURL: string;
            isBlocked: boolean;
            status: "pending" | "approved" | "rejected";
            phoneNumber: string;
        };
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
    getProfileInfoFunc: (req: Request) => Promise<mongoose.Document<unknown, {}, IUserCreate, {}, mongoose.DefaultSchemaOptions> & IUserCreate & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateUserFunc: (payload: IUserCreate) => Promise<mongoose.UpdateWriteOpResult>;
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