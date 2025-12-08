"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const auth_model_1 = require("./auth.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_codes_1 = require("http-status-codes");
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const signupFunc = async (registraionDoc) => {
    const res = await auth_model_1.Signup.create(registraionDoc);
    return res;
};
const loginFunc = async (payload) => {
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const user = await auth_model_1.Signup.findOne({ email: payload?.email }).session(session);
        if (!user) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found😒');
        }
        if (user?.isBlocked) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'User is blocked 🤡');
        }
        if (!(await auth_model_1.Signup.isPasswordMatched(payload?.password, user?.password))) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Incorrect Password😵‍💫');
        }
        const jwtPayload = {
            email: user?.email,
            role: user?.role,
        };
        const accessToken = (0, auth_utils_1.generateToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
        const refreshToken = (0, auth_utils_1.generateToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
        await session.commitTransaction();
        session.endSession();
        return {
            accessToken,
            refreshToken,
            userInfo: {
                name: user?.name,
                email: user?.email,
                role: user?.role,
                photoURL: user?.photoURL,
            },
        };
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
const getAllUsersFunc = async () => {
    const users = await auth_model_1.Signup.find();
    return users;
};
const statusFuc = async (payload) => {
    const users = await auth_model_1.Signup.findById(payload?.id);
    if (!users) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    if (users?.role === "admin") {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, `Admin's status can not be changed`);
    }
    if (!payload?.action) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid action');
    }
    if (payload?.action === 'block') {
        const res = await auth_model_1.Signup.findByIdAndUpdate(payload?.id, { isBlocked: true });
        return res;
    }
    if (payload?.action === 'active') {
        const res = await auth_model_1.Signup.findByIdAndUpdate(payload?.id, { isActive: true });
        return res;
    }
    if (payload?.action === 'deactive') {
        const res = await auth_model_1.Signup.findByIdAndUpdate(payload?.id, { isActive: false });
        return res;
    }
};
const updatePasswordFunc = async (payload) => {
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const user = await auth_model_1.Signup.findOne({ email: payload?.email }).session(session);
        if (!user) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
        }
        const isMatchPassword = await bcrypt_1.default.compare(payload?.cpassword, user?.password);
        if (!isMatchPassword) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Incorrect current password');
        }
        const newpass = await bcrypt_1.default.hash(payload?.npassword, Number(config_1.default.bcrypt_salt_rounds));
        if (!newpass) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Error in password hash');
        }
        const res = await auth_model_1.Signup.updateOne({ email: payload?.email }, { password: newpass }).session(session);
        await session.commitTransaction();
        session.endSession();
        return res;
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
const getSingleUserFunc = async (email) => {
    const res = await auth_model_1.Signup.findOne({ email });
    return res;
};
const updateNameFunc = async (payload) => {
    if (!payload?.email) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'User not found');
    }
    if (!payload?.name) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NO_CONTENT, "NO name found");
    }
    try {
        const data = await auth_model_1.Signup.updateOne({ email: payload?.email }, {
            $set: {
                name: payload?.name
            }
        });
        const result = data?.modifiedCount > 0 ? { name: payload?.name } : {};
        return result;
    }
    catch (error) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Can not update Profile');
    }
};
exports.authService = {
    signupFunc,
    loginFunc,
    getAllUsersFunc,
    statusFuc,
    updatePasswordFunc,
    getSingleUserFunc,
    updateNameFunc
};
//# sourceMappingURL=auth.service.js.map