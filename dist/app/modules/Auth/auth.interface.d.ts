import { Document, Model, Types } from 'mongoose';
export interface IUserCreate extends Document {
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: 'admin' | 'landlord' | 'tenant';
    isBlocked: boolean;
    isActive: boolean;
    photoURL: string;
    status: 'pending' | 'approved' | 'rejected';
    subscriptionPlan: 'free' | 'premium';
}
export interface TLogin extends Model<IUserCreate> {
    isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
    isUserExistsByCustomId(email: string): Promise<IUserCreate>;
}
export type TLoginUser = {
    email: string;
    password: string;
};
export interface TJwtPayload {
    email: string;
    role: "admin" | "landlord" | "tenant";
}
export interface IJwtPayload extends Document {
    id: Types.ObjectId;
    email: string;
    role: 'admin' | 'landlord' | 'tenant';
    iat: number;
    exp: number;
}
//# sourceMappingURL=auth.interface.d.ts.map