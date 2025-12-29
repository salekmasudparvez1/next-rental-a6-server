import { z } from "zod"

export const TenantCreateZodSchema = z.object({
    body: z.object({
        tenantId: z.string().min(1).optional(),
        rentalHouseId: z.string().min(1, "rentalHouseId is required").optional(),
        landloardId: z.string().min(1).optional(),
        date: z.object({
                from: z.coerce.date(),
                to: z.coerce.date(),
            }),

        status: z.enum(["pending", "approve", "reject"]).default("pending").optional(),
        paymentStatus: z.enum(["paid", "unpaid"]).default("unpaid").optional(),
    }),
})

export const TenantUpdateZodSchema = TenantCreateZodSchema.partial();
