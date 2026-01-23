"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.landloardService = void 0;
const http_status_codes_1 = require("http-status-codes");
const cloudinary_1 = require("../../config/cloudinary");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const landloard_model_1 = require("./landloard.model");
const auth_model_1 = require("../auth/auth.model");
const mongoose_1 = require("mongoose");
const tenent_model_1 = require("../tenent/tenent.model");
const createPropertiesFunc = async (data, files, userId) => {
    // Upload images to Cloudinary
    const imageUrls = [];
    if (files && files.length > 0) {
        for (const file of files) {
            const { secure_url } = await (0, cloudinary_1.sendImageBufferToCloudinary)(`property-${Date.now()}-${file.originalname}`, file.buffer);
            imageUrls.push(secure_url);
        }
    }
    const findLandloard = await auth_model_1.Signup.findById(userId);
    if (!findLandloard) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Landlord not found!');
    }
    const postData = {
        title: data?.title,
        location: data?.location,
        features: data?.features,
        description: data?.description,
        rentAmount: data?.rentAmount,
        landloardId: findLandloard?._id,
        bedroomNumber: data?.bedroomNumber,
        comments: data?.comments,
        status: data?.status || 'available',
        isPublished: data?.isPublished ?? false
    };
    // Create property with data and image URLs
    const total = {
        ...postData,
        images: imageUrls,
    };
    const result = await landloard_model_1.RentalHouseModel.create(total);
    return result;
};
const getAllPropertiesFunc = async (req) => {
    const userId = req.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const total = await landloard_model_1.RentalHouseModel.countDocuments({ landloardId: userId });
    //filter part
    const properties = await landloard_model_1.RentalHouseModel.find({ landloardId: userId }).skip(skip).limit(limit);
    return {
        data: properties,
        meta: {
            page,
            limit,
            total,
        }
    };
};
const getSinglePropertyFunc = async (req) => {
    const id = req.params.id;
    const userId = req.userId;
    //step-1 validation check
    const propertyInfo = await landloard_model_1.RentalHouseModel.findById(id);
    if (!propertyInfo) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Property not found!');
    }
    if (userId.toString() !== propertyInfo?.landloardId?.toString()) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'You are not authorized to view this property!');
    }
    return propertyInfo;
};
const updatePropertiesFunc = async (req) => {
    // get data 
    const id = req.params.id;
    const data = req?.body?.data ? JSON.parse(req?.body?.data) : req.body;
    const files = req?.files;
    const userId = req.userId;
    //step-1 validation check
    const propertyInfo = await landloard_model_1.RentalHouseModel.findById(id);
    if (!propertyInfo) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Property not found!');
    }
    if (userId.toString() !== propertyInfo?.landloardId?.toString()) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'You are not authorized to update this property!');
    }
    //step-2 hanlde images if given
    const imagesUrls = [];
    if (files && files.length > 0) {
        for (const file of files) {
            const { secure_url } = await (0, cloudinary_1.sendImageBufferToCloudinary)(`property-${Date.now()}-${file.originalname}`, file.buffer);
            imagesUrls.push(secure_url);
        }
    }
    // step-4 update fields valu which is need only
    const updateData = {};
    if (data.title)
        updateData.title = data.title;
    if (data.location) {
        // Merge incoming location with existing to support partial updates
        updateData.location = {
            ...propertyInfo.location,
            ...data.location,
            map: data.location.map
                ? { ...propertyInfo.location.map, ...data.location.map }
                : propertyInfo.location.map,
        };
    }
    if (data.description)
        updateData.description = data.description;
    if (data.rentAmount !== undefined)
        updateData.rentAmount = data.rentAmount;
    if (data.bedroomNumber !== undefined)
        updateData.bedroomNumber = data.bedroomNumber;
    if (data.features)
        updateData.features = data.features;
    if (data.comments)
        updateData.comments = data.comments;
    if (data.status)
        updateData.status = data.status;
    if (data.isPublished !== undefined)
        updateData.isPublished = data.isPublished;
    // Add new images to existing images (or replace if you prefer)
    if (imagesUrls.length > 0) {
        updateData.images = [...propertyInfo.images, ...imagesUrls].slice(-4); // Append new images
        // OR to replace: updateData.images = imageUrls;
    }
    // Update the property
    const result = await landloard_model_1.RentalHouseModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    return result;
};
const deletePropertiesFunc = async (req) => {
    const id = req.params.id;
    const userId = req.userId;
    //step-1 validation check
    const propertyInfo = await landloard_model_1.RentalHouseModel.findById(id);
    if (!propertyInfo) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Property not found!');
    }
    if (userId.toString() !== propertyInfo?.landloardId?.toString()) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'You are not authorized to delete this property!');
    }
    // step-2 delete property
    const result = await landloard_model_1.RentalHouseModel.findByIdAndDelete(id);
    return result;
};
//tenant request handle part
const getAllRequestsFunc = async (req) => {
    //spacific landloard id wise get request
    const userId = req.userId;
    const houses = await tenent_model_1.TenantApplicationModel
        .find({ landloardId: userId })
        .populate({ path: 'tenantId', model: auth_model_1.Signup, select: "-password -__v" })
        .populate({ path: 'rentalHouseId', model: landloard_model_1.RentalHouseModel });
    return houses;
};
const updateRequestFunc = async (req) => {
    const id = req.params.id;
    const payload = req.body;
    const userId = req.userId;
    //step-1 validation check
    const requestInfo = await tenent_model_1.TenantApplicationModel.findById(id);
    if (!requestInfo) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Tenant application not found!');
    }
    if (userId.toString() !== requestInfo?.landloardId?.toString()) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'You are not authorized to update this tenant application!');
    }
    // Step-2: Update the tenant application status
    const updated = await tenent_model_1.TenantApplicationModel.findByIdAndUpdate(id, { status: payload.status }, { new: true, runValidators: true });
    return updated;
};
const getLanloardDashbordFunc = async (req) => {
    const user = req.user;
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are not the author");
    }
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const response = await landloard_model_1.RentalHouseModel.aggregate([
        {
            // Filter only rental houses of this landlord
            $match: {
                landloardId: new mongoose_1.Types.ObjectId(user?.id)
            }
        },
        {
            $facet: {
                totalProperties: [{ $count: "count" }],
                occupiedHouses: [{ $match: { status: "rented" } }, { $count: "count" }],
                vacantHouses: [{ $match: { status: "available" } }, { $count: "count" }],
                monthlyIncome: [
                    {
                        $lookup: {
                            from: "tenantRequests",
                            localField: "_id",
                            foreignField: "rentalHouseId",
                            as: "requests",
                        },
                    },
                    { $unwind: { path: "$requests", preserveNullAndEmptyArrays: true } },
                    {
                        $lookup: {
                            from: "transaction",
                            localField: "requests._id",
                            foreignField: "requestId",
                            as: "transactions",
                        },
                    },
                    { $unwind: { path: "$transactions", preserveNullAndEmptyArrays: true } },
                    {
                        $match: {
                            "transactions.createdAt": { $gte: startOfMonth, $lte: endOfMonth },
                            "transactions.paymentStatus.status": "success"
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            monthlyIncome: { $sum: "$transactions.amount" },
                        },
                    },
                ],
            },
        },
        {
            $project: {
                totalProperties: { $arrayElemAt: ["$totalProperties.count", 0] },
                occupiedHouses: { $arrayElemAt: ["$occupiedHouses.count", 0] },
                vacantHouses: { $arrayElemAt: ["$vacantHouses.count", 0] },
                monthlyIncome: {
                    $ifNull: [{ $arrayElemAt: ["$monthlyIncome.monthlyIncome", 0] }, 0],
                },
            },
        },
    ]);
    return {
        success: true,
        message: "Dashboard data fetch successfully",
        data: response,
    };
};
exports.landloardService = {
    createPropertiesFunc,
    getAllPropertiesFunc,
    getSinglePropertyFunc,
    updatePropertiesFunc,
    deletePropertiesFunc,
    getAllRequestsFunc,
    updateRequestFunc,
    getLanloardDashbordFunc
};
//# sourceMappingURL=landloard.service.js.map