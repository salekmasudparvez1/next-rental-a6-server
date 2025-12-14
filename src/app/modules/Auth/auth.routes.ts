import { Router } from "express";
import { authController } from "./auth.controller";
import verifyAdmin from "../../middlewares/verifyAdmin";
import { loginValidationSchema, signupValidationSchema } from "./auth.validations";
import validateRequest from "../../middlewares/validateRequest";
import verifyUser from "../../middlewares/verifyUser";


const authRouter = Router()
authRouter.post('/signup', validateRequest(signupValidationSchema), authController.signup);
authRouter.post('/login', validateRequest(loginValidationSchema), authController.login);
authRouter.get('/profile',verifyUser ,authController.getProfileInfo);
authRouter.get('/all-users',verifyAdmin, authController.getAllUsers);
authRouter.delete('/delete/:id',verifyAdmin, authController.deleteUser);
authRouter.get('/getSingle/:email', authController.getSingleUser);
authRouter.patch('/update',verifyAdmin, authController.status);
authRouter.patch('/update/user', authController.updateName);
authRouter.patch('/update/password', authController.updatePassword);

export default authRouter;