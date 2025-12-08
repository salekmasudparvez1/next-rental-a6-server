"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const auth_service_1 = require("./auth.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const config_1 = __importDefault(require("../../config"));
const signup = (0, catchAsync_1.default)(async (req, res) => {
    const getDoc = req.body;
    const payload = {
        ...getDoc,
        isBlocked: false,
        photoURL: 'https://res.cloudinary.com/dncnvqrc6/image/upload/v1740454884/untitled.png',
    };
    const result = await auth_service_1.authService.signupFunc(payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'User sign up successfully',
        data: {
            name: result?.name,
            email: result.email,
        },
        statusCode: http_status_codes_1.default.ACCEPTED,
    });
});
const login = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.authService.loginFunc(req.body);
    const { accessToken, refreshToken } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config_1.default.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'User logged in successfully',
        data: {
            accessToken,
            user: result?.userInfo,
        },
        statusCode: http_status_codes_1.default.OK,
    });
});
const getAllUsers = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.authService.getAllUsersFunc();
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'All users fetched successfully',
        data: result,
        statusCode: http_status_codes_1.default.OK,
    });
});
const status = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.authService.statusFuc(req?.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Updated user status ',
        data: result,
        statusCode: http_status_codes_1.default.OK,
    });
});
const updatePassword = (0, catchAsync_1.default)(async (req, res) => {
    const getUpdateInfo = req.body;
    const result = await auth_service_1.authService.updatePasswordFunc(getUpdateInfo);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Updated user password ',
        data: result,
        statusCode: http_status_codes_1.default.OK,
    });
});
const getSingleUser = (0, catchAsync_1.default)(async (req, res) => {
    const getUserInfo = req.params.email;
    const result = await auth_service_1.authService.getSingleUserFunc(getUserInfo);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Updated user profile ',
        data: result,
        statusCode: http_status_codes_1.default.OK,
    });
});
const updateName = (0, catchAsync_1.default)(async (req, res) => {
    const getUserInfo = req.body;
    const result = await auth_service_1.authService.updateNameFunc({
        name: getUserInfo?.name,
        email: getUserInfo?.email,
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Updated user profile ',
        data: result,
        statusCode: http_status_codes_1.default.OK,
    });
});
exports.authController = {
    signup,
    login,
    getAllUsers,
    status,
    updatePassword,
    getSingleUser,
    updateName,
};
//# sourceMappingURL=auth.controller.js.map