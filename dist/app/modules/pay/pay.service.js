"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payService = void 0;
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_codes_1 = require("http-status-codes");
const stripe = new stripe_1.default(config_1.default.STRIPE_SECRET_KEY);
const createPaymentIntentFunc = async (req) => {
    const session = await stripe.paymentIntents.create({
        amount: 5000,
        currency: 'usd',
        payment_method_types: ['card'],
    });
    return { clientSecret: session.client_secret };
};
const handleWebhookFunc = async (rawBody, sigHeader) => {
    const endpointSecret = config_1.default.STRIPE_WEBHOOK_SECRET;
    if (!endpointSecret) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Stripe webhook secret is not configured');
    }
    let event;
    try {
        const payload = rawBody instanceof Buffer ? rawBody : Buffer.from(rawBody);
        event = stripe.webhooks.constructEvent(payload, sigHeader || '', endpointSecret);
    }
    catch (err) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Stripe webhook signature verification failed');
    }
    // Handle common events
    switch (event.type) {
        case 'payment_intent.succeeded': {
            const paymentIntent = event.data.object;
            console.log('PaymentIntent succeeded:', paymentIntent.id);
            // TODO: update DB / mark payment as completed
            break;
        }
        case 'payment_intent.payment_failed': {
            const paymentIntent = event.data.object;
            console.log('PaymentIntent failed:', paymentIntent.id);
            break;
        }
        case 'checkout.session.completed': {
            const session = event.data.object;
            console.log('Checkout session completed:', session.id);
            // TODO: fulfill the purchase, etc.
            break;
        }
        default:
            console.log(`Unhandled Stripe event type: ${event.type}`);
    }
    return { received: true };
};
exports.payService = {
    createPaymentIntentFunc,
    handleWebhookFunc
};
//# sourceMappingURL=pay.service.js.map