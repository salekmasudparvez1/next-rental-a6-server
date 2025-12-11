import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { TenantCreateZodSchema, TenantUpdateZodSchema } from './tenent.validations';
import { tenentController } from './tenent.controller';
import verifyTenant from '../../middlewares/verifyTenant';
import verifyLandLoard from '../../middlewares/verifyLandLoard';

const tenentRouter = Router();

// Create application
tenentRouter.post('/requests',verifyTenant, validateRequest(TenantCreateZodSchema), tenentController.createRequest);

// List applications
tenentRouter.get('/requests',verifyTenant, tenentController.listRequests);

// // Update status
// tenentRouter.put('/request/:id',verifyLandLoard, validateRequest(TenantUpdateZodSchema), tenentController.updateRequest);

export default tenentRouter;
