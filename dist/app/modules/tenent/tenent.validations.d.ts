import { z } from 'zod';
export declare const TenantCreateZodSchema: z.ZodObject<{
    body: z.ZodObject<{
        tenantId: z.ZodOptional<z.ZodString>;
        rentalHouseId: z.ZodString;
        landloardId: z.ZodOptional<z.ZodString>;
        status: z.ZodDefault<z.ZodEnum<{
            pending: "pending";
            approve: "approve";
            reject: "reject";
        }>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const TenantUpdateZodSchema: z.ZodObject<{
    body: z.ZodOptional<z.ZodObject<{
        tenantId: z.ZodOptional<z.ZodString>;
        rentalHouseId: z.ZodString;
        landloardId: z.ZodOptional<z.ZodString>;
        status: z.ZodDefault<z.ZodEnum<{
            pending: "pending";
            approve: "approve";
            reject: "reject";
        }>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
//# sourceMappingURL=tenent.validations.d.ts.map