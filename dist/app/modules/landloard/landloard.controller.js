"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.landloardController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const landloard_service_1 = require("./landloard.service");
const http_status_codes_1 = require("http-status-codes");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const createProperties = (0, catchAsync_1.default)(async (req, res) => {
    // Parse the data field from form-data
    const data = JSON.parse(req.body?.data);
    // Get uploaded files
    const files = req.files;
    // Pass both data and files to service
    const result = await landloard_service_1.landloardService.createPropertiesFunc(data, files, req.userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Properties created successfully',
        data: result,
        statusCode: http_status_codes_1.StatusCodes.OK,
    });
});
const getAllProperties = (0, catchAsync_1.default)(async (req, res) => {
    const result = await landloard_service_1.landloardService.getAllPropertiesFunc();
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Properties retrieved successfully',
        data: result,
        statusCode: http_status_codes_1.StatusCodes.OK,
    });
});
const updateProperties = (0, catchAsync_1.default)(async (req, res) => {
    const result = await landloard_service_1.landloardService.updatePropertiesFunc(req);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Properties updated successfully',
        data: result,
        statusCode: http_status_codes_1.StatusCodes.OK,
    });
});
exports.landloardController = {
    createProperties,
    getAllProperties,
    updateProperties
};
//# sourceMappingURL=landloard.controller.js.map