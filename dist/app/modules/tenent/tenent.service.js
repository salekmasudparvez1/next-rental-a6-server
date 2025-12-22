"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenentService = exports.getAllPropertiesPublicFunc = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const tenent_model_1 = require("./tenent.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_codes_1 = require("http-status-codes");
const landloard_model_1 = require("../landloard/landloard.model");
const auth_model_1 = require("../auth/auth.model");
const createRequestFunc = async (req, payload) => {
    const rawUserId = req.userId;
    const tenantId = typeof rawUserId === 'string' ? new mongoose_1.Types.ObjectId(rawUserId) : rawUserId;
    const getLandloardId = await landloard_model_1.RentalHouseModel.findById(payload?.id).select('landloardId');
    if (!getLandloardId) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Rental house not found to get landloardId!');
    }
    const isExisting = await tenent_model_1.TenantApplicationModel.findOne({
        tenantId: tenantId,
        rentalHouseId: new mongoose_1.Types.ObjectId(payload?.id),
    });
    if (isExisting) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, 'You have already applied for this rental house!');
    }
    const createDoc = {
        tenantId,
        rentalHouseId: new mongoose_1.Types.ObjectId(payload?.id),
        landloardId: getLandloardId?.landloardId,
        status: 'pending',
        date: payload?.date,
    };
    const doc = await tenent_model_1.TenantApplicationModel.create(createDoc);
    return doc;
};
const listRequestsFunc = async (req) => {
    const rawUserId = req.userId;
    const userId = typeof rawUserId === 'string' ? new mongoose_1.Types.ObjectId(rawUserId) : rawUserId;
    // Extra visibility while debugging
    const all = await tenent_model_1.TenantApplicationModel.find().lean();
    const requests = await tenent_model_1.TenantApplicationModel.find({ tenantId: userId }).populate({
        path: "rentalHouseId",
        model: landloard_model_1.RentalHouseModel
    }).populate({
        path: "landloardId",
        select: "-password",
        model: auth_model_1.Signup
    }).lean();
    return requests;
};
const getSingleRequestFunc = async (req) => {
    const rawUserId = req.userId;
    const userId = typeof rawUserId === 'string' ? new mongoose_1.Types.ObjectId(rawUserId) : rawUserId;
    const requestRentalHouseId = req.params.id;
    const rentalHouseId = typeof requestRentalHouseId === 'string' ? new mongoose_1.Types.ObjectId(requestRentalHouseId) : requestRentalHouseId;
    const request = await tenent_model_1.TenantApplicationModel.findOne({ rentalHouseId: new mongoose_1.default.Types.ObjectId(rentalHouseId), tenantId: new mongoose_1.default.Types.ObjectId(userId) }).populate({
        path: "rentalHouseId",
        model: landloard_model_1.RentalHouseModel
    }).populate({
        path: "landloardId",
        select: "-password",
        model: auth_model_1.Signup
    }).lean();
    return request;
};
const getAllPropertiesPublicFunc = async (req) => {
    const postId = req.query.id;
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const skip = (page - 1) * limit;
    const getuserId = req?.userId;
    // If postId exists ==> fetch single property --- none login
    if (postId && postId !== "undefined" && postId.trim() !== "") {
        if (getuserId) {
            const property = await landloard_model_1.RentalHouseModel.findOne({ _id: new mongoose_1.default.Types.ObjectId(postId) });
            const findLandloard = await auth_model_1.Signup.findById(property?.landloardId).select('-password');
            const propertyWithLandloard = property ? {
                ...property.toObject(),
                landloardDetails: findLandloard,
            } : null;
            return {
                data: propertyWithLandloard ? [propertyWithLandloard] : [],
                meta: {
                    page: 1,
                    limit: 1,
                    total: property ? 1 : 0,
                },
            };
        }
        else {
            const property = await landloard_model_1.RentalHouseModel.findOne({ _id: new mongoose_1.default.Types.ObjectId(postId) }).select('-landloardId');
            return {
                data: property ? [property] : [],
                meta: {
                    page: 1,
                    limit: 1,
                    total: property ? 1 : 0,
                },
            };
        }
    }
    // Otherwise fetch paginated properties
    const total = await landloard_model_1.RentalHouseModel.countDocuments();
    const properties = await landloard_model_1.RentalHouseModel.find().skip(skip).limit(limit);
    return {
        data: properties,
        meta: {
            page,
            limit,
            total,
        },
    };
};
exports.getAllPropertiesPublicFunc = getAllPropertiesPublicFunc;
exports.tenentService = {
    createRequestFunc,
    listRequestsFunc,
    getSingleRequestFunc,
    getAllPropertiesPublicFunc: exports.getAllPropertiesPublicFunc
};
//# sourceMappingURL=tenent.service.js.map