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
// Rental House — Create Schema
export const RentalHouseCreateZodSchema = z.object({
  rentalHouseLocation: z.string().min(2, "Location is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  landloardId: landlordIdSchema,
  rentAmount: z.number().positive("Rent must be a positive number"),
  images: z.array(z.string().url("Each image must be a valid URL")).optional(),
  bedroomNumber: z.number().min(1).max(20, "Bedrooms must be between 1–20"),
  features: z.array(FeatureZodSchema).optional(),
  comments: z.array(CommentZodSchema).optional(),
});


// Rental House — Update Schema (Partial)
export const RentalHouseUpdateZodSchema = RentalHouseCreateZodSchema.partial();
