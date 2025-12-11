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
const auth_model_1 = require("../Auth/auth.model");
const createPropertiesFunc = async (data, files, userId) => {
    // Upload images to Cloudinary
    const imageUrls = [];
    if (files && files.length > 0) {
        for (const file of files) {
            const { secure_url } = await (0, cloudinary_1.sendImageToCloudinary)(`property-${Date.now()}-${file.originalname}`, file.path);
            imageUrls.push(secure_url);
        }
    }
    const findLandloard = await auth_model_1.Signup.findById(userId);
    if (!findLandloard) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Landlord not found!');
    }
    const postData = {
        rentalHouseLocation: data?.rentalHouseLocation,
        description: data?.description,
        rentAmount: data?.rentAmount,
        landloardId: findLandloard?._id,
        bedroomNumber: data?.bedroomNumber,
        features: data?.features,
        comments: data?.comments
    };
    // Create property with data and image URLs
    const total = {
        ...postData,
        images: imageUrls,
    };
    const result = await landloard_model_1.RentalHouseModel.create(total);
    return result;
};
const getAllPropertiesFunc = async () => {
    const properties = await landloard_model_1.RentalHouseModel.find();
    return properties;
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
    if (!userId.equals(propertyInfo?._id)) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'You are not authorized to update this property!');
    }
    //step-2 hanlde images if given
    const imagesUrls = [];
    if (files && files.length > 0) {
        for (const file of files) {
            const { secure_url } = await (0, cloudinary_1.sendImageToCloudinary)(`property-${Date.now()}-${file.originalname}`, file.path);
            imagesUrls.push(secure_url);
        }
    }
    // step-4 update fields valu which is need only
    const updateData = {};
    if (data.rentalHouseLocation)
        updateData.rentalHouseLocation = data.rentalHouseLocation;
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
    // Add new images to existing images (or replace if you prefer)
    if (imagesUrls.length > 0) {
        updateData.images = [...propertyInfo.images, ...imagesUrls].slice(-4); // Append new images
        // OR to replace: updateData.images = imageUrls;
    }
    // Update the property
    const result = await landloard_model_1.RentalHouseModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    return result;
};
exports.landloardService = {
    createPropertiesFunc,
    getAllPropertiesFunc,
    updatePropertiesFunc
};
//# sourceMappingURL=landloard.service.js.map