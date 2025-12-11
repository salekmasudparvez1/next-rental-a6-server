import { z } from 'zod';

export const TenantCreateZodSchema = z.object({
    body: z.object({
        tenantId: z.string().min(1, 'tenantId is required').optional(),
        rentalHouseId: z.string().min(1, 'rentalHouseId is required'),
        landloardId: z.string().min(1, 'landloardId is required').optional(),
        status: z.enum(['pending', 'approve', 'reject']).default('pending'),
    }),
});

export const TenantUpdateZodSchema = TenantCreateZodSchema.partial();
