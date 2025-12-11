
import { StatusCodes } from "http-status-codes";
import { sendImageBufferToCloudinary } from "../../config/cloudinary";
import AppError from "../../errors/AppError";
import { RentalHouseModel } from "./landloard.model";
import { Signup } from "../Auth/auth.model";
import { Request } from "express";
import { Types } from "mongoose";
import { TenantApplicationModel } from "../tenent/tenent.model";

const createPropertiesFunc = async (data: any, files: Express.Multer.File[], userId: string) => {
  // Upload images to Cloudinary
  const imageUrls: string[] = [];

  if (files && files.length > 0) {
    for (const file of files) {
      const { secure_url } = await sendImageBufferToCloudinary(
        `property-${Date.now()}-${file.originalname}`,
        file.buffer,
      );
      imageUrls.push(secure_url);
    }
  }
  const findLandloard = await Signup.findById(userId);


  if (!findLandloard) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Landlord not found!');
  }
  const postData = {
    rentalHouseLocation: data?.rentalHouseLocation,
    description: data?.description,
    rentAmount: data?.rentAmount,
    landloardId: findLandloard?._id,
    bedroomNumber: data?.bedroomNumber,
    features: data?.features,
    comments: data?.comments

  }
  // Create property with data and image URLs
  const total = {
    ...postData,
    images: imageUrls,
  };

  const result = await RentalHouseModel.create(total);

  return result;
};
const getAllPropertiesFunc = async (req: Request) => {
  const userId = (req as Request & { userId: string }).userId;
  const properties = await RentalHouseModel.find({ landloardId: userId });
  return properties;
}
const updatePropertiesFunc = async (req: Request) => {
  // get data 
  const id = req.params.id
  const data = req?.body?.data ? JSON.parse(req?.body?.data) : req.body;
  const files = req?.files as Express.Multer.File[];
  const userId = (req as Request & { userId: string }).userId

  //step-1 validation check
  const propertyInfo = await RentalHouseModel.findById(id)

  if (!propertyInfo) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Property not found!');
  }
  if (userId.toString() !== propertyInfo?.landloardId?.toString()) {
    throw new AppError(StatusCodes.FORBIDDEN, 'You are not authorized to update this property!');
  }
  //step-2 hanlde images if given
  const imagesUrls: string[] = [];
  if (files && files.length > 0) {
    for (const file of files) {
      const { secure_url } = await sendImageBufferToCloudinary(
        `property-${Date.now()}-${file.originalname}`,
        file.buffer,
      );
      imagesUrls.push(secure_url);
    }
  }
  // step-4 update fields valu which is need only
  const updateData: any = {};
  if (data.rentalHouseLocation) updateData.rentalHouseLocation = data.rentalHouseLocation;
  if (data.description) updateData.description = data.description;
  if (data.rentAmount !== undefined) updateData.rentAmount = data.rentAmount;
  if (data.bedroomNumber !== undefined) updateData.bedroomNumber = data.bedroomNumber;
  if (data.features) updateData.features = data.features;
  if (data.comments) updateData.comments = data.comments;
  // Add new images to existing images (or replace if you prefer)

  if (imagesUrls.length > 0) {
    updateData.images = [...propertyInfo.images, ...imagesUrls].slice(-4); // Append new images
    // OR to replace: updateData.images = imageUrls;
  }

  // Update the property
  const result = await RentalHouseModel.findByIdAndUpdate(
    id,
    updateData,
    { new: true, runValidators: true }
  );

  return result;

}
const deletePropertiesFunc = async (req: Request) => {
  const id = req.params.id;
  const userId = (req as Request & { userId: string }).userId;
  //step-1 validation check
  const propertyInfo = await RentalHouseModel.findById(id)

  if (!propertyInfo) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Property not found!');
  }
  if (userId.toString() !== propertyInfo?.landloardId?.toString()) {
    throw new AppError(StatusCodes.FORBIDDEN, 'You are not authorized to delete this property!');
  }
  // step-2 delete property
  const result = await RentalHouseModel.findByIdAndDelete(id);
  return result;
}
//tenant request handle part

const getAllRequestsFunc = async (req: Request) => {
  //spacific landloard id wise get request
  const userId = (req as Request & { userId: string }).userId;
  const houses = await TenantApplicationModel
    .find({ landloardId: userId })
    .populate({ path: 'tenantId', model: Signup as any })
    .populate({ path: 'rentalHouseId', model: RentalHouseModel as any });
  return houses;

}

const updateRequestFunc = async (req: Request) => {
  const id = req.params.id;
  const payload = req.body;
  const userId = (req as Request & { userId: string }).userId;

  //step-1 validation check
  const requestInfo = await TenantApplicationModel.findById(id);

  if (!requestInfo) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Tenant application not found!');
  }
  if (userId.toString() !== requestInfo?.landloardId?.toString()) {
    throw new AppError(StatusCodes.FORBIDDEN, 'You are not authorized to update this tenant application!');
  }
  
  // Step-2: Update the tenant application status
  const updated = await TenantApplicationModel.findByIdAndUpdate(id, { status: payload.status }, { new: true, runValidators: true });
  return updated;
};



export const landloardService = {
  createPropertiesFunc,
  getAllPropertiesFunc,
  updatePropertiesFunc,
  deletePropertiesFunc,
  getAllRequestsFunc,
  updateRequestFunc
};