import { IUserCreate, TLoginUser } from './auth.interface';
import mongoose from 'mongoose';
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
    loginFunc: (payload: TLoginUser) => Promise<{
        accessToken: string;
        refreshToken: string;
        userInfo: {
            name: string;
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