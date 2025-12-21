"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const tenent_validations_1 = require("./tenent.validations");
const tenent_controller_1 = require("./tenent.controller");
const verifyTenant_copy_1 = __importDefault(require("../../middlewares/verifyTenant copy"));
const verifyLogin_1 = __importDefault(require("../../middlewares/verifyLogin"));
const tenentRouter = (0, express_1.Router)();
// Create application
tenentRouter.post('/requests', verifyTenant_copy_1.default, (0, validateRequest_1.default)(tenent_validations_1.TenantCreateZodSchema), tenent_controller_1.tenentController.createRequest);
// List applications
tenentRouter.get('/requests', verifyTenant_copy_1.default, tenent_controller_1.tenentController.listRequests);
tenentRouter.get('/request/:id', verifyTenant_copy_1.default, tenent_controller_1.tenentController.getSingleRequest);
/*==get all properrty for public query==*/
tenentRouter.get('/get-all', verifyLogin_1.default, tenent_controller_1.tenentController.getAllPropertiesPublic);
tenentRouter.get('/get-all/:id', tenent_controller_1.tenentController.getAllPropertiesPublic);
// // Update status
// tenentRouter.put('/request/:id',verifyLandLoard, validateRequest(TenantUpdateZodSchema), tenentController.updateRequest);
exports.default = tenentRouter;
//# sourceMappingURL=tenent.routes.js.map