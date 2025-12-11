import { Types } from 'mongoose';
import { TenantApplicationModel } from './tenent.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { Request } from 'express';
import { RentalHouseModel } from '../landloard/landloard.model';

const createRequestFunc = async (
  req: Request,
  payload: { rentalHouseId: string; status?: 'pending' | 'approve' | 'reject' }
) => {
  const rawUserId = (req as any).userId;
  const tenantId = typeof rawUserId === 'string' ? new Types.ObjectId(rawUserId) : rawUserId;
  const getLandloardId = await RentalHouseModel.findById(payload.rentalHouseId).select('landloardId');
  
  if (!getLandloardId) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Rental house not found to get landloardId!');
  }
  const doc = await TenantApplicationModel.create({
    tenantId,
    rentalHouseId: new Types.ObjectId(payload.rentalHouseId),
    landloardId: getLandloardId.landloardId,
    status: payload.status ?? 'pending',
  });
  return doc;
};

const listRequestsFunc = async (req: Request) => {
  const rawUserId = (req as any).userId;
  const userId = typeof rawUserId === 'string' ? new Types.ObjectId(rawUserId) : rawUserId;

  // Extra visibility while debugging
  const all = await TenantApplicationModel.find().lean();
  const requests = await TenantApplicationModel.find({ tenantId: userId }).lean();
  console.log({
    user: (req as any).user,
    userId,
    totalDocs: all.length,
    sampleDocs: all.slice(0, 3),
    matched: requests.length,
  });
  return requests;
};



export const tenentService = {
  createRequestFunc,
  listRequestsFunc,
  

};
