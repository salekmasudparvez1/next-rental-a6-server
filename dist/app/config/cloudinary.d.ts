import { v2 as cloudinary } from 'cloudinary';
export declare const sendImageToCloudinary: (imageName: string, path: string) => Promise<{
    secure_url: string;
    public_id: string;
}>;
export default cloudinary;
//# sourceMappingURL=cloudinary.d.ts.map