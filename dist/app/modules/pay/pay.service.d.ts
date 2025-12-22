import { Request } from "express";
export declare const payService: {
    createPaymentIntentFunc: (req: Request) => Promise<{
        clientSecret: string | null;
    }>;
    handleWebhookFunc: (rawBody: Buffer | string, sigHeader?: string) => Promise<{
        received: boolean;
    }>;
};
//# sourceMappingURL=pay.service.d.ts.map