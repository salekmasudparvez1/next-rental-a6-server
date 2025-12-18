"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalHouseUpdateZodSchema = exports.RentalHouseCreateZodSchema = exports.LocationZodSchema = exports.landlordIdSchema = exports.CommentZodSchema = exports.FeatureZodSchema = void 0;
const zod_1 = require("zod");
// Feature Schema
exports.FeatureZodSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Feature name is required"),
    color: zod_1.z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, "Invalid color hex")
});
// Comment Schema
exports.CommentZodSchema = zod_1.z.object({
    userId: zod_1.z.string().min(1, "User ID is required"),
    comment: zod_1.z.string().min(3, "Comment must have at least 3 characters"),
    rating: zod_1.z.number().min(1).max(5).default(3),
});
exports.landlordIdSchema = zod_1.z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), { message: "Invalid MongoDB ObjectId" });
// Location Schema
exports.LocationZodSchema = zod_1.z.object({
    division: zod_1.z.string().min(1, "Division is required"),
    district: zod_1.z.string().min(1, "District is required"),
    subDistrict: zod_1.z.string().min(1, "Sub-district is required"),
    streetAddress: zod_1.z.string().min(1, "Street address is required"),
    map: zod_1.z.object({
        lat: zod_1.z.number().min(-90).max(90, "Latitude must be between -90 and 90"),
        lng: zod_1.z.number().min(-180).max(180, "Longitude must be between -180 and 180"),
    }),
});
// Rental House — Create Schema
exports.RentalHouseCreateZodSchema = zod_1.z.object({
    title: zod_1.z.string().min(2, "Title is required"),
    rentalHouseLocation: exports.LocationZodSchema,
    description: zod_1.z.string().min(5, "Description must be at least 5 characters"),
    status: zod_1.z.enum(["available", "rented", "maintenance"]).default("available"),
    isPublished: zod_1.z.boolean().default(false).optional(),
    landloardId: exports.landlordIdSchema,
    rentAmount: zod_1.z.number().positive("Rent must be a positive number"),
    images: zod_1.z.array(zod_1.z.string().url("Each image must be a valid URL")).max(4, "A maximum of 4 images are allowed").optional(),
    bedroomNumber: zod_1.z.number().min(1).max(20, "Bedrooms must be between 1–20"),
    features: zod_1.z.array(exports.FeatureZodSchema).optional(),
    comments: zod_1.z.array(exports.CommentZodSchema).optional(),
});
// Rental House — Update Schema (Partial)
exports.RentalHouseUpdateZodSchema = exports.RentalHouseCreateZodSchema.partial();
//# sourceMappingURL=landloard.validations.js.map