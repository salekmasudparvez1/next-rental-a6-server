import { z } from "zod";
export declare const signupValidationSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
        role: z.ZodEnum<{
            admin: "admin";
            landlord: "landlord";
            tenant: "tenant";
        }>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const loginValidationSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=auth.validations.d.ts.map