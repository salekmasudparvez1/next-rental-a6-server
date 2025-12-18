"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenentService = exports.getAllPropertiesPublicFunc = void 0;
const mongoose_1 = require("mongoose");
const tenent_model_1 = require("./tenent.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_codes_1 = require("http-status-codes");
const landloard_model_1 = require("../landloard/landloard.model");
const createRequestFunc = async (req, payload) => {
    const rawUserId = req.userId;
    const tenantId = typeof rawUserId === 'string' ? new mongoose_1.Types.ObjectId(rawUserId) : rawUserId;
    const getLandloardId = await landloard_model_1.RentalHouseModel.findById(payload.rentalHouseId).select('landloardId');
    if (!getLandloardId) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Rental house not found to get landloardId!');
    }
    const doc = await tenent_model_1.TenantApplicationModel.create({
        tenantId,
        rentalHouseId: new mongoose_1.Types.ObjectId(payload.rentalHouseId),
        landloardId: getLandloardId.landloardId,
        status: payload.status ?? 'pending',
    });
    return doc;
};
const listRequestsFunc = async (req) => {
    const rawUserId = req.userId;
    const userId = typeof rawUserId === 'string' ? new mongoose_1.Types.ObjectId(rawUserId) : rawUserId;
    // Extra visibility while debugging
    const all = await tenent_model_1.TenantApplicationModel.find().lean();
    const requests = await tenent_model_1.TenantApplicationModel.find({ tenantId: userId }).lean();
    return requests;
};
const getAllPropertiesPublicFunc = async (req) => {
    const postId = req.query.id;
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const skip = (page - 1) * limit;
    // If postId exists, fetch single property
    if (postId && postId !== "undefined" && postId.trim() !== "") {
        const property = await landloard_model_1.RentalHouseModel.findOne({ _id: postId });
        return {
            data: property ? [property] : [],
            meta: {
                page: 1,
                limit: 1,
                total: property ? 1 : 0,
            },
        };
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
    getAllPropertiesPublicFunc: exports.getAllPropertiesPublicFunc
};
//# sourceMappingURL=tenent.service.js.map