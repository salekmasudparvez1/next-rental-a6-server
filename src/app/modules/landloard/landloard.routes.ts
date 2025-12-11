import { Router } from "express";
import { landloardController } from "./landloard.controller";
import validateRequest from "../../middlewares/validateRequest";
import { RentalHouseUpdateZodSchema } from "./landloard.validations";
import { uploadMultiple } from "../../utils/multer";
import verifyLandLoard from "../../middlewares/verifyLandLoard";



const landloardRouter = Router();

landloardRouter.post('/listings',
    verifyLandLoard,
    uploadMultiple,
    validateRequest(RentalHouseUpdateZodSchema),
    landloardController.createProperties);
    
landloardRouter.get('/listings',
    verifyLandLoard,
    landloardController.getAllProperties);
    
landloardRouter.put('/listings/:id',
    verifyLandLoard,
    uploadMultiple,
    validateRequest(RentalHouseUpdateZodSchema),
    landloardController.updateProperties);

landloardRouter.delete('/listings/:id',
    verifyLandLoard,
    landloardController.deleteProperties);
//tenant requests part
landloardRouter.get('/requests',
    verifyLandLoard,
    landloardController.getAllRequests);
landloardRouter.put('/requests/:id',
    verifyLandLoard,
    landloardController.updateRequest);


export default landloardRouter;