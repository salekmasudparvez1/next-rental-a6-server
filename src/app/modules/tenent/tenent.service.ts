import mongoose, { Types } from 'mongoose';
import { TenantApplicationModel } from './tenent.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { Request } from 'express';
import { RentalHouseModel } from '../landloard/landloard.model';
import { Signup } from '../auth/auth.model';

const createRequestFunc = async (req: Request, payload: {
  id: string; date: {
    from: Date;
    to: Date;
  };
}
) => {
  const rawUserId = (req as any).userId;
  const tenantId = typeof rawUserId === 'string' ? new Types.ObjectId(rawUserId) : rawUserId;
  const getLandloardId = await RentalHouseModel.findById(payload?.id).select('landloardId');

  if (!getLandloardId) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Rental house not found to get landloardId!');
  }
  const isExisting = await TenantApplicationModel.findOne({
    tenantId: tenantId,
    rentalHouseId: new Types.ObjectId(payload?.id),
  });

  if (isExisting) {
    throw new AppError(StatusCodes.CONFLICT, 'You have already applied for this rental house!');
  }
  const createDoc = {
    tenantId,
    rentalHouseId: new Types.ObjectId(payload?.id),
    landloardId: getLandloardId?.landloardId,
    status: 'pending',
    date: payload?.date,
  }

  const doc = await TenantApplicationModel.create(createDoc);
  return doc;
};

const listRequestsFunc = async (req: Request) => {
  const rawUserId = (req as any).userId;
  const userId = typeof rawUserId === 'string' ? new Types.ObjectId(rawUserId) : rawUserId;

  // Extra visibility while debugging
  const all = await TenantApplicationModel.find().lean();
  const requests = await TenantApplicationModel.find({ tenantId: userId }).populate({
    path: "rentalHouseId",
    model: RentalHouseModel
  }).populate({
    path: "landloardId",
    select: "-password",
    model: Signup
  }).lean();

  return requests;
};
const getSingleRequestFunc = async (req: Request) => {
  const rawUserId = (req as any).userId;
  const userId = typeof rawUserId === 'string' ? new Types.ObjectId(rawUserId) : rawUserId;
  const requestRentalHouseId = req.params.id;
  const rentalHouseId = typeof requestRentalHouseId === 'string' ? new Types.ObjectId(requestRentalHouseId) : requestRentalHouseId;


  const request = await TenantApplicationModel.findOne({ rentalHouseId: new mongoose.Types.ObjectId(rentalHouseId), tenantId: new mongoose.Types.ObjectId(userId) }).populate({
    path: "rentalHouseId",
    model: RentalHouseModel
  }).populate({
    path: "landloardId",
    select: "-password",
    model: Signup
  }).lean();

  return request;
}


interface RequestWithUser extends Request {
  query: { id?: string; page?: string; limit?: string };
  userId?: Types.ObjectId;
}

export const getAllPropertiesPublicFunc = async (req: RequestWithUser) => {
  const postId = req.query.id;
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  const skip = (page - 1) * limit;
  const getuserId = req?.userId;


  // If postId exists ==> fetch single property --- none login

  if (postId && postId !== "undefined" && postId.trim() !== "") {

    if (getuserId) {

      const property = await RentalHouseModel.findOne({ _id: new mongoose.Types.ObjectId(postId) });
      const findLandloard = await Signup.findById(property?.landloardId).select('-password');
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

    } else {
      const property = await RentalHouseModel.findOne({ _id: new mongoose.Types.ObjectId(postId) }).select('-landloardId');

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
  const total = await RentalHouseModel.countDocuments();
  const properties = await RentalHouseModel.find().skip(skip).limit(limit);

  return {
    data: properties,
    meta: {
      page,
      limit,
      total,
    },
  };
};



export const tenentService = {
  createRequestFunc,
  listRequestsFunc,
  getSingleRequestFunc,
  getAllPropertiesPublicFunc
};

