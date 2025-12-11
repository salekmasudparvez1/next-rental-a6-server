import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { tenentService } from './tenent.service';
import { StatusCodes } from 'http-status-codes';

const createRequest = catchAsync(async (req: Request, res: Response) => {
    const data = req.body?.data ? JSON.parse(req.body.data) : req.body;
    const { rentalHouseId, status } = data;
    const result = await tenentService.createRequestFunc(req, { rentalHouseId, status });
    sendResponse(res, {
        success: true,
        message: 'Tenant application created',
        data: result,
        statusCode: StatusCodes.OK,
    });
});

const listRequests = catchAsync(async (req: Request, res: Response) => {
    
    const result = await tenentService.listRequestsFunc(req as any);
    sendResponse(res, {
        success: true,
        message: 'Tenant applications fetched',
        data: result,
        statusCode: StatusCodes.OK,
    });
}); 
 




export const tenentController = {
    createRequest,
    listRequests,
   
   
};
