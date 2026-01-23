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
const config_1 = __importDefault(require("../../config"));
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
const Webhook = (0, catchAsync_1.default)(async (req, res) => {
    /*--------------------------notes for me----------------------------------- */
    /* safe way to get rawBody if it exists, otherwise use the normal parsed body
    Some middlewares (like express.json()) parse req.body into an object, destroying the raw bytes.for this reason taking req.rowBody if it null or undefined takeing req.body.
  
    now question is what is destroying bites :❌ Problem: Stripe’s webhook signature verification requires the exact original bytes. If you use req.body after parsing, it may fail verification because some characters, whitespace, or encoding may have changed.
  
    and there is a "signature" in header from stripe webhook calls :https://docs.stripe.com/webhooks/signature
  
    */
    /*--------------------------happy codding with Parvez---------------------------------- */
    const rawBodyBuffer = req.rawBody;
    const payloadBody = rawBodyBuffer ?? (req.body instanceof Buffer ? req.body : Buffer.from(JSON.stringify(req.body)));
    const signature = req.headers['stripe-signature'];
    // Debug: help determine if Vercel is delivering the exact raw bytes and signature header
    console.log('Stripe webhook incoming:', { hasRawBody: !!rawBodyBuffer, hasSignature: !!signature, endpointSecretConfigured: !!config_1.default.STRIPE_WEBHOOK_SECRET });
    const result = await pay_service_1.payService.WebhookFunc(payloadBody, signature);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Your payment has been success',
        data: result,
        statusCode: http_status_codes_1.StatusCodes.OK,
    });
});
// Get all transactions
const getAllTransactions = (0, catchAsync_1.default)(async (req, res) => {
    const result = await pay_service_1.payService.getAllTransactionsFunc(req);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'All transactions fetched successfully',
        data: result,
        statusCode: http_status_codes_1.StatusCodes.OK,
    });
});
// get single tanent transactions by status
const getSingleTransactionsByStatus = (0, catchAsync_1.default)(async (req, res) => {
    const result = await pay_service_1.payService.getSingleTransactionsByStatusFunc(req);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Single tenant transactions fetched successfully',
        data: result,
        statusCode: http_status_codes_1.StatusCodes.OK,
    });
});
// get single tanent transactions by id
const getSingleTenantTransactions = (0, catchAsync_1.default)(async (req, res) => {
    const result = await pay_service_1.payService.getSingleTransactionsByStatusFunc(req);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Single tenant transactions fetched successfully',
        data: result,
        statusCode: http_status_codes_1.StatusCodes.OK,
    });
});
//get transaction by payment intent id
const getTransactionByPaymentIntentId = (0, catchAsync_1.default)(async (req, res) => {
    const result = await pay_service_1.payService.getTransactionByPaymentIntentId(req);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Transaction fetched successfully by payment intent id',
        data: result,
        statusCode: http_status_codes_1.StatusCodes.OK,
    });
});
exports.paymentControler = {
    createPaymentIntent,
    Webhook,
    getAllTransactions,
    getSingleTenantTransactions,
    getSingleTransactionsByStatus,
    getTransactionByPaymentIntentId
};
//# sourceMappingURL=pay.controller.js.map