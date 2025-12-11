"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantUpdateZodSchema = exports.TenantCreateZodSchema = void 0;
const zod_1 = require("zod");
exports.TenantCreateZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        tenantId: zod_1.z.string().min(1, 'tenantId is required').optional(),
        rentalHouseId: zod_1.z.string().min(1, 'rentalHouseId is required'),
        landloardId: zod_1.z.string().min(1, 'landloardId is required').optional(),
        status: zod_1.z.enum(['pending', 'approve', 'reject']).default('pending'),
    }),
});
exports.TenantUpdateZodSchema = exports.TenantCreateZodSchema.partial();
//# sourceMappingURL=tenent.validations.js.map