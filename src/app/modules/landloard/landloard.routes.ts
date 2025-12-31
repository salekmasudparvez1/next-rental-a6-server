import { Router } from "express";
import { landloardController } from "./landloard.controller";
import validateRequest from "../../middlewares/validateRequest";
import { RentalHouseUpdateZodSchema } from "./landloard.validations";
import { uploadMultiple } from "../../utils/multer";
import verifyLandLoard from "../../middlewares/verifyLandLoard";



const landloardRouter = Router();
//dashboard info
landloardRouter.get('/info',
    verifyLandLoard,
    landloardController.getLanloardDashbord);

//create properties
landloardRouter.post('/listings',
    verifyLandLoard,
    uploadMultiple,
    validateRequest(RentalHouseUpdateZodSchema),
    landloardController.createProperties);
//get all properties
landloardRouter.get('/listings',
    verifyLandLoard,
    landloardController.getAllProperties);
//get single property
landloardRouter.get('/listings/:id',
    verifyLandLoard,
    landloardController.getSingleProperty);
//update properties
landloardRouter.put('/listings/:id',
    verifyLandLoard,
    uploadMultiple,
    validateRequest(RentalHouseUpdateZodSchema),
    landloardController.updateProperties);
//delete properties
landloardRouter.delete('/listings/:id',
    verifyLandLoard,
    landloardController.deleteProperties);

/*--------------------------------*/
/*------this is request part-------*/
/*--------------------------------*/

//tenant requests part
landloardRouter.get('/requests',
    verifyLandLoard,
    landloardController.getAllRequests);
//update tenant request
landloardRouter.put('/requests/:id',
    verifyLandLoard,
    landloardController.updateRequest);


export default landloardRouter;