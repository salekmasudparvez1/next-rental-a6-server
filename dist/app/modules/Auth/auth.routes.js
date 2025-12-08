"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const verifyCustomer_1 = __importDefault(require("../../middlewares/verifyCustomer"));
const verifyAdmin_1 = __importDefault(require("../../middlewares/verifyAdmin"));
const auth_validations_1 = require("./auth.validations");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const authRouter = (0, express_1.Router)();
authRouter.post('/signup', (0, validateRequest_1.default)(auth_validations_1.signupValidationSchema), auth_controller_1.authController.signup);
authRouter.post('/login', (0, validateRequest_1.default)(auth_validations_1.loginValidationSchema), auth_controller_1.authController.login);
authRouter.get('/all', verifyAdmin_1.default, auth_controller_1.authController.getAllUsers);
authRouter.get('/getSingle/:email', verifyCustomer_1.default, auth_controller_1.authController.getSingleUser);
authRouter.patch('/update', verifyAdmin_1.default, auth_controller_1.authController.status);
authRouter.patch('/update/user', verifyCustomer_1.default, auth_controller_1.authController.updateName);
authRouter.patch('/update/password', verifyCustomer_1.default, auth_controller_1.authController.updatePassword);
exports.default = authRouter;
//# sourceMappingURL=auth.routes.js.map