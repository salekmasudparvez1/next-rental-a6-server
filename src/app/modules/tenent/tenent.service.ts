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
    paymentStatus: 'PENDING',

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
const getSingleRequestByIdFunc = async (req: Request) => {

  const requestRentalHouseId = req.params.id;
  const rentalHouseId = typeof requestRentalHouseId === 'string' ? new Types.ObjectId(requestRentalHouseId) : requestRentalHouseId;


  const request = await TenantApplicationModel.findById(rentalHouseId).populate({
    path: "rentalHouseId",
    model: RentalHouseModel
  }).populate({
    path: "landloardId",
    select: "-password",
    model: Signup
  }).lean();

  return request;
}
const getSingleRequestByUserInfoFunc = async (req: Request) => {

  const requestRentalHouseId = req.params.id;
  const rawUserId = (req as any).userId;
  const rentalHouseId = typeof requestRentalHouseId === 'string' ? new Types.ObjectId(requestRentalHouseId) : requestRentalHouseId;
  const userId = typeof rawUserId === 'string' ? new Types.ObjectId(rawUserId) : rawUserId;
  if (!rentalHouseId || !userId) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Both rentalHouseId and userId are required');
  }
  const request = await TenantApplicationModel.findOne({
    tenantId: userId,
    rentalHouseId: rentalHouseId
  }).populate({
    path: "rentalHouseId",
    model: RentalHouseModel
  }).populate({
    path: "landloardId",
    select: "-password",
    model: Signup
  }).lean();

  return request;
}


 const getAllPropertiesPublicFunc = async (req: any) => {
  const postId = req.query.id as string | undefined;
  const userId = req?.userId;

  // Safe Pagination Numbers (Ensure valid integers)
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.max(1, Number(req.query.limit) || 10);
  const skip = (page - 1) * limit;

  // =========================================================
  // SCENARIO 1: FETCH SINGLE PROPERTY
  // =========================================================
  if (postId && postId !== "undefined" && postId.trim() !== "") {
    
    // Safety check for valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return { data: [], meta: { page: 1, limit: 1, total: 0 } };
    }

    const objectId = new mongoose.Types.ObjectId(postId);
    let resultData;

    if (userId) {
      // Logged In: Get Property + Landlord
      const property = await RentalHouseModel.findById(objectId).lean();
      
      if (property) {
        const landlord = await Signup.findById(property.landloardId)
          .select('-password')
          .lean();

        resultData = { ...property, landloardDetails: landlord || null };
      }
    } else {
      // Public: Get Property ONLY
      resultData = await RentalHouseModel.findById(objectId)
        .select('-landloardId')
        .lean();
    }

    return {
      data: resultData ? [resultData] : [],
      meta: { page: 1, limit: 1, total: resultData ? 1 : 0 },
    };
  }

  // =========================================================
  // SCENARIO 2: LIST VIEW (FILTERING)
  // =========================================================


  const query: Record<string, any> = {};

  const bedrooms = req.query.bedrooms ? Number(req.query.bedrooms) : undefined;
  const district = req.query.district as string || undefined;
  const division = req.query.division as string || undefined;
  const subDistrict = req.query.subDistrict as string || undefined;
  const minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;
  const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;

  // 1. Build Query
  if (bedrooms) query.bedroomNumber = bedrooms;
  
  // Use bracket notation for nested fields (safer/cleaner than creating nested objects)
  if (division?.trim()) query['location.division'] = division;
  if (district?.trim()) query['location.district'] = district;
  if (subDistrict?.trim()) query['location.subDistrict'] = subDistrict;

  // Price Logic (Handled safely)
  if (minPrice !== undefined || maxPrice !== undefined) {
    query.rentAmount = {};
    if (minPrice !== undefined) query.rentAmount.$gte = minPrice;
    if (maxPrice !== undefined) query.rentAmount.$lte = maxPrice;
  }

  // 2. Parallel Execution (Fastest Method)
  // Using Promise.all reduces API latency by running Count and Find simultaneously
  const [total, properties] = await Promise.all([
    RentalHouseModel.countDocuments(query),
    RentalHouseModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-landloardId') 
      .lean() 
  ]);

  return {
    data: properties,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    },
  };
};


export const tenentService = {
  createRequestFunc,
  listRequestsFunc,
  getSingleRequestByIdFunc,
  getSingleRequestByUserInfoFunc,
  getAllPropertiesPublicFunc
};

