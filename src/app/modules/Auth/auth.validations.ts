
import { z } from "zod";


export const signupValidationSchema = z.object({
    body: z.object({
        username: z.string().min(1, 'Name is required'),
        email: z.string().email('Invalid email address'),
        phoneNumber: z.number().min(10, 'Phone number must be at least 10 digits'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        role: z.enum(['admin', 'landlord', 'tenant']),
        subscriptionPlan: z.enum(['free', 'premium']).optional().default('free'),
    }),
})
export const loginValidationSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email address').optional(),
        username: z.string().min(1, 'Username is required').optional(),
        password: z.string().min(1, 'Password is required'),
    }).refine((data) => data.email || data.username, {
        message: 'Either email or username is required',
        path: ['email'],
    }),
});