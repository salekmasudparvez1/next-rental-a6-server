"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenentController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const tenent_service_1 = require("./tenent.service");
const http_status_codes_1 = require("http-status-codes");
const createRequest = (0, catchAsync_1.default)(async (req, res) => {
    const data = req.body?.data ? JSON.parse(req.body.data) : req.body;
    const { rentalHouseId, status } = data;
    const result = await tenent_service_1.tenentService.createRequestFunc(req, { rentalHouseId, status });
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Tenant application created',
        data: result,
        statusCode: http_status_codes_1.StatusCodes.OK,
    });
});
const listRequests = (0, catchAsync_1.default)(async (req, res) => {
    const result = await tenent_service_1.tenentService.listRequestsFunc(req);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Tenant applications fetched',
        data: result,
        statusCode: http_status_codes_1.StatusCodes.OK,
    });
});
exports.tenentController = {
    createRequest,
    listRequests,
};
//# sourceMappingURL=tenent.controller.js.map