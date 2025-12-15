
import { z } from 'zod';

// Feature Schema
export const FeatureZodSchema = z.object({
  name: z.string().min(1, "Feature name is required"),
  color: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, "Invalid color hex")
});

// Comment Schema
export const CommentZodSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  comment: z.string().min(3, "Comment must have at least 3 characters"),
  rating: z.number().min(1).max(5).default(3),
});

export const landlordIdSchema = z.string().refine(
  (val) => /^[0-9a-fA-F]{24}$/.test(val),
  { message: "Invalid MongoDB ObjectId" }
);

// Location Schema
export const LocationZodSchema = z.object({
  division: z.string().min(1, "Division is required"),
  district: z.string().min(1, "District is required"),
  subDistrict: z.string().min(1, "Sub-district is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  map: z.object({
    lat: z.number().min(-90).max(90, "Latitude must be between -90 and 90"),
    lng: z.number().min(-180).max(180, "Longitude must be between -180 and 180"),
  }),
});

// Rental House — Create Schema
export const RentalHouseCreateZodSchema = z.object({
  title: z.string().min(2, "Title is required"),
  rentalHouseLocation: LocationZodSchema,
  description: z.string().min(5, "Description must be at least 5 characters"),
  status: z.enum(["available", "rented", "maintenance"]).default("available"),
  isPublished: z.boolean().default(false).optional(),
  landloardId: landlordIdSchema,
  rentAmount: z.number().positive("Rent must be a positive number"),
  images: z.array(z.string().url("Each image must be a valid URL")).max(4, "A maximum of 4 images are allowed").optional(),
  bedroomNumber: z.number().min(1).max(20, "Bedrooms must be between 1–20"),
  features: z.array(FeatureZodSchema).optional(),
  comments: z.array(CommentZodSchema).optional(),
});


// Rental House — Update Schema (Partial)
export const RentalHouseUpdateZodSchema = RentalHouseCreateZodSchema.partial();
