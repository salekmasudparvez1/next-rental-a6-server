"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentControler = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const pay_service_1 = require("./pay.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const createPaymentIntent = (0, catchAsync_1.default)(async (req, res) => {
    const result = await pay_service_1.payService.createPaymentIntentFunc(req);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Your paymentintent has been success',
        data: result,
        statusCode: http_status_codes_1.StatusCodes.OK,
    });
});
// Stripe webhook handler
const handleWebhook = (0, catchAsync_1.default)(async (req, res) => {
    // raw body should be available either via express.raw middleware or via req.rawBody set in app.json verify
    const rawBody = req.rawBody ?? req.body;
    const sig = req.headers['stripe-signature'];
    const result = await pay_service_1.payService.handleWebhookFunc(rawBody, sig);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Your payment has been success',
        data: result,
        statusCode: http_status_codes_1.StatusCodes.OK,
    });
});
exports.paymentControler = {
    createPaymentIntent,
    handleWebhook
};
//# sourceMappingURL=pay.controller.js.map