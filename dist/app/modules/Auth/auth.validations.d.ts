import { z } from "zod";
export declare const signupValidationSchema: z.ZodObject<{
    body: z.ZodObject<{
        username: z.ZodString;
        email: z.ZodString;
        phoneNumber: z.ZodString;
        password: z.ZodString;
        role: z.ZodEnum<{
            admin: "admin";
            landlord: "landlord";
            tenant: "tenant";
        }>;
        subscriptionPlan: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
            free: "free";
            premium: "premium";
        }>>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const loginValidationSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodOptional<z.ZodString>;
        username: z.ZodOptional<z.ZodString>;
        password: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=auth.validations.d.ts.map