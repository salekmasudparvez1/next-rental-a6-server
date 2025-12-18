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
export declare const LocationZodSchema: z.ZodObject<{
    division: z.ZodString;
    district: z.ZodString;
    subDistrict: z.ZodString;
    streetAddress: z.ZodString;
    map: z.ZodObject<{
        lat: z.ZodNumber;
        lng: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const RentalHouseCreateZodSchema: z.ZodObject<{
    title: z.ZodString;
    rentalHouseLocation: z.ZodObject<{
        division: z.ZodString;
        district: z.ZodString;
        subDistrict: z.ZodString;
        streetAddress: z.ZodString;
        map: z.ZodObject<{
            lat: z.ZodNumber;
            lng: z.ZodNumber;
        }, z.core.$strip>;
    }, z.core.$strip>;
    description: z.ZodString;
    status: z.ZodDefault<z.ZodEnum<{
        available: "available";
        rented: "rented";
        maintenance: "maintenance";
    }>>;
    isPublished: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
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
    title: z.ZodOptional<z.ZodString>;
    rentalHouseLocation: z.ZodOptional<z.ZodObject<{
        division: z.ZodString;
        district: z.ZodString;
        subDistrict: z.ZodString;
        streetAddress: z.ZodString;
        map: z.ZodObject<{
            lat: z.ZodNumber;
            lng: z.ZodNumber;
        }, z.core.$strip>;
    }, z.core.$strip>>;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        available: "available";
        rented: "rented";
        maintenance: "maintenance";
    }>>>;
    isPublished: z.ZodOptional<z.ZodOptional<z.ZodDefault<z.ZodBoolean>>>;
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