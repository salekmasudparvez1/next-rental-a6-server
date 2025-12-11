"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const landloard_controller_1 = require("./landloard.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const landloard_validations_1 = require("./landloard.validations");
const multer_1 = require("../../utils/multer");
const verifyLandLoard_1 = __importDefault(require("../../middlewares/verifyLandLoard"));
const landloardRouter = (0, express_1.Router)();
landloardRouter.post('/listings', verifyLandLoard_1.default, multer_1.uploadMultiple, (0, validateRequest_1.default)(landloard_validations_1.RentalHouseUpdateZodSchema), landloard_controller_1.landloardController.createProperties);
landloardRouter.get('/listings', verifyLandLoard_1.default, landloard_controller_1.landloardController.getAllProperties);
landloardRouter.put('/listings/:id', verifyLandLoard_1.default, multer_1.uploadMultiple, (0, validateRequest_1.default)(landloard_validations_1.RentalHouseUpdateZodSchema), landloard_controller_1.landloardController.updateProperties);
exports.default = landloardRouter;
//# sourceMappingURL=landloard.routes.js.map