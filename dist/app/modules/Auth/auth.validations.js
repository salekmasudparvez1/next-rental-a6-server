"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidationSchema = exports.signupValidationSchema = void 0;
const zod_1 = require("zod");
exports.signupValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string().min(1, 'Name is required'),
        email: zod_1.z.string().email('Invalid email address'),
        phoneNumber: zod_1.z.number().min(10, 'Phone number must be at least 10 digits'),
        password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
        role: zod_1.z.enum(['admin', 'landlord', 'tenant']),
        subscriptionPlan: zod_1.z.enum(['free', 'premium']).optional().default('free'),
    }),
});
exports.loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email('Invalid email address').optional(),
        username: zod_1.z.string().min(1, 'Username is required').optional(),
        password: zod_1.z.string().min(1, 'Password is required'),
    }).refine((data) => data.email || data.username, {
        message: 'Either email or username is required',
        path: ['email'],
    }),
});
//# sourceMappingURL=auth.validations.js.map