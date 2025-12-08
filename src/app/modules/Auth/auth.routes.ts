import { Router } from "express";
import { authController } from "./auth.controller";
import verifyCustomer from "../../middlewares/verifyCustomer";
import verifyAdmin from "../../middlewares/verifyAdmin";
import { upload } from "../../utils/sendImageToCloudinary";
import { loginValidationSchema, signupValidationSchema } from "./auth.validations";
import validateRequest from "../../middlewares/validateRequest";


const authRouter = Router()
authRouter.post('/signup', validateRequest(signupValidationSchema), authController.signup);
authRouter.post('/login', validateRequest(loginValidationSchema), authController.login);
authRouter.get('/all',verifyAdmin, authController.getAllUsers);
authRouter.get('/getSingle/:email',verifyCustomer, authController.getSingleUser);
authRouter.patch('/update',verifyAdmin, authController.status);
authRouter.patch('/update/user',verifyCustomer, authController.updateName);
authRouter.patch('/update/password',verifyCustomer, authController.updatePassword);

export default authRouter;