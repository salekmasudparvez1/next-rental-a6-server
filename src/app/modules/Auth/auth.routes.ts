import { Router } from "express";
import { authController } from "./auth.controller";
import verifyAdmin from "../../middlewares/verifyAdmin";
import { loginValidationSchema, signupValidationSchema } from "./auth.validations";
import validateRequest from "../../middlewares/validateRequest";


const authRouter = Router()
authRouter.post('/signup', validateRequest(signupValidationSchema), authController.signup);
authRouter.post('/login', validateRequest(loginValidationSchema), authController.login);
authRouter.get('/all',verifyAdmin, authController.getAllUsers);
authRouter.get('/getSingle/:email', authController.getSingleUser);
authRouter.patch('/update',verifyAdmin, authController.status);
authRouter.patch('/update/user', authController.updateName);
authRouter.patch('/update/password', authController.updatePassword);

export default authRouter;