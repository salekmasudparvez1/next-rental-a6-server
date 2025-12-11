import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { landloardService } from "./landloard.service";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../utils/sendResponse";





const createProperties = catchAsync(async (req: Request, res: Response) => {
  // Parse the data field from form-data
  const data = JSON.parse(req.body?.data);

  // Get uploaded files
  const files = req.files as Express.Multer.File[];



  // Pass both data and files to service
  const result = await landloardService.createPropertiesFunc(data, files, (req as Request & { userId: string }).userId);

  sendResponse(res, {
    success: true,
    message: 'Properties created successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});
const getAllProperties = catchAsync(async (req: Request, res: Response) => {

const result = await landloardService.getAllPropertiesFunc(req as Request);

  sendResponse(res, {
    success: true,
    message: 'Properties retrieved successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});

const updateProperties = catchAsync(async (req: Request, res: Response) => {
  const result = await landloardService.updatePropertiesFunc(req as Request);

  sendResponse(res, {
    success: true,
    message: 'Properties updated successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});

const deleteProperties = catchAsync(async (req: Request, res: Response) => {
  const result = await landloardService.deletePropertiesFunc(req as Request);

  sendResponse(res, {
    success: true,
    message: 'Properties deleted successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});

//tenant request part
const getAllRequests = catchAsync(async (req: Request, res: Response) => {

  const result = await landloardService.getAllRequestsFunc(req as Request);

    sendResponse(res, {
      success: true,
      message: 'Tenant requests retrieved successfully',
      data: result,
      statusCode: StatusCodes.OK,
    });
  });

const updateRequest = catchAsync(async (req: Request, res: Response) => {

    const result = await landloardService.updateRequestFunc(req as Request);
    sendResponse(res, {
        success: true,
        message: 'Tenant application updated',
        data: result,
        statusCode: StatusCodes.OK,
    });
});

export const landloardController = {
  createProperties,
  getAllProperties,
  updateProperties,
  deleteProperties,
  getAllRequests,
  updateRequest
};

