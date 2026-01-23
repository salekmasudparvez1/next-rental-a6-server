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
const signupFunc = async (registrationDoc) => {
    // 1. Role validation
    if (registrationDoc.role === 'admin') {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Admin registration is not allowed');
    }
    // 2. Username validation
    if (!registrationDoc.username) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Username is required');
    }
    registrationDoc.username = registrationDoc.username.trim();
    if (/\s/.test(registrationDoc.username)) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Username cannot contain whitespace');
    }
    // 3. Email validation
    if (!registrationDoc.email) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Email is required');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registrationDoc.email)) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid email format');
    }
    // 4. Phone number validation
    if (!registrationDoc.phoneNumber) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Phone number is required');
    }
    const phoneRegex = /^\+?\d{10,15}$/; // optional +, 10-15 digits
    if (!phoneRegex.test(registrationDoc.phoneNumber.toString())) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid phone number');
    }
    // 5. Check uniqueness in a single DB query
    const existing = await auth_model_1.Signup.findOne({
        $or: [
            { username: registrationDoc.username },
            { email: registrationDoc.email },
            { phoneNumber: registrationDoc.phoneNumber }
        ]
    });
    if (existing) {
        if (existing.username === registrationDoc.username) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, 'Username already exists');
        }
        if (existing.email === registrationDoc.email) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, 'Email already exists');
        }
        if (existing.phoneNumber === registrationDoc.phoneNumber) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, 'Phone number already exists');
        }
    }
    // 7. Create user
    const res = await auth_model_1.Signup.create(registrationDoc);
    // 8. JWT payload
    const jwtPayload = {
        id: res._id,
        email: res?.email,
        username: res?.username,
        role: res?.role,
        isBlocked: res?.isBlocked,
        isActive: res?.isActive,
        subscriptionPlan: res?.subscriptionPlan,
        status: res?.status,
        photoURL: res?.photoURL,
    };
    const accessToken = (0, auth_utils_1.generateToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, auth_utils_1.generateToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    // 9. Return response
    return {
        accessToken,
        refreshToken,
        userInfo: {
            username: res.username,
            email: res.email,
            role: res.role,
            photoURL: res.photoURL,
            isBlocked: res.isBlocked,
            status: res.status,
            phoneNumber: res.phoneNumber,
        },
    };
};
// Helper to safely build a case-insensitive exact-match RegExp from arbitrary input
const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/**
* Allow login using either username OR email + password.
* - Accepts payload.email or payload.username or payload.identifier (preferred generic name).
* - Performs case-insensitive lookup for both username and email.
*/
const loginFunc = async (payload) => {
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Accept multiple possible identifier fields for flexibility
        const rawIdentifier = (payload?.identifier ?? payload?.email ?? payload?.username)?.toString().trim();
        const password = payload?.password;
        if (!rawIdentifier || !password) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Identifier (email or username) and password are required');
        }
        // Use case-insensitive exact-match search on both email and username.
        // Escaping prevents regex injection if identifier contains special chars.
        const safe = escapeRegExp(rawIdentifier);
        const query = {
            $or: [
                { email: new RegExp(`^${safe}$`, 'i') },
                { username: new RegExp(`^${safe}$`, 'i') },
            ],
        };
        const user = await auth_model_1.Signup.findOne(query).session(session);
        if (!user) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found 😒');
        }
        if (user?.isBlocked) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'User is blocked 🤡');
        }
        if (!user?.password) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'User is not valid 🚫');
        }
        // Assuming Signup.isPasswordMatched(plainText, hashed) is a static helper
        if (!(await auth_model_1.Signup.isPasswordMatched(password, user?.password))) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Incorrect Password 😵‍💫');
        }
        const jwtPayload = {
            id: user._id,
            email: user?.email,
            role: user?.role,
            username: user?.username,
            isBlocked: user?.isBlocked,
            isActive: user?.isActive,
            subscriptionPlan: user?.subscriptionPlan,
            status: user?.status,
            photoURL: user?.photoURL,
        };
        const accessToken = (0, auth_utils_1.generateToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
        const refreshToken = (0, auth_utils_1.generateToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
        await session.commitTransaction();
        session.endSession();
        return {
            accessToken,
            refreshToken,
            userInfo: {
                username: user?.username,
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
const updateUserFunc = async (payload) => {
    const user = await auth_model_1.Signup.findOne({ email: payload?.email });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    const res = await auth_model_1.Signup.updateOne({ email: payload?.email }, payload);
    return res;
};
const getProfileInfoFunc = async (req) => {
    const payload = req.user;
    if (!payload?.email) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'User not found');
    }
    const user = await auth_model_1.Signup.findOne({ email: payload?.email });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    return user;
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
        if (!user?.password) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'User has no password set');
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
    getProfileInfoFunc,
    updateUserFunc,
    statusFuc,
    updatePasswordFunc,
    getSingleUserFunc,
    updateNameFunc
};
//# sourceMappingURL=auth.service.js.map