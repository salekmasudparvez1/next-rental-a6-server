import { z } from 'zod';
export declare const FeatureZodSchema: z.ZodObject<{
    name: z.ZodString;
    color: z.ZodString;
}, z.core.$strip>;
export declare const CommentZodSchema: z.ZodObject<{
    userId: z.ZodString;
    comment: z.ZodString;
    rating: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;
export declare const landlordIdSchema: z.ZodString;
export declare const RentalHouseCreateZodSchema: z.ZodObject<{
    rentalHouseLocation: z.ZodString;
    description: z.ZodString;
    landloardId: z.ZodString;
    rentAmount: z.ZodNumber;
    images: z.ZodOptional<z.ZodArray<z.ZodString>>;
    bedroomNumber: z.ZodNumber;
    features: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        color: z.ZodString;
    }, z.core.$strip>>>;
    comments: z.ZodOptional<z.ZodArray<z.ZodObject<{
        userId: z.ZodString;
        comment: z.ZodString;
        rating: z.ZodDefault<z.ZodNumber>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export declare const RentalHouseUpdateZodSchema: z.ZodObject<{
    rentalHouseLocation: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    landloardId: z.ZodOptional<z.ZodString>;
    rentAmount: z.ZodOptional<z.ZodNumber>;
    images: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    bedroomNumber: z.ZodOptional<z.ZodNumber>;
    features: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        color: z.ZodString;
    }, z.core.$strip>>>>;
    comments: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
        userId: z.ZodString;
        comment: z.ZodString;
        rating: z.ZodDefault<z.ZodNumber>;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
//# sourceMappingURL=landloard.validations.d.ts.map