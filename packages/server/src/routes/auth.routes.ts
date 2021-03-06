import { Router } from "express";
import { authController } from "../controllers";

export const authRouter = Router();

authRouter.post("basic/login", authController.basicLogin);
authRouter.post("basic/signup", authController.basicSignup);
authRouter.post("basic/reset", authController.basicReqReset);
authRouter.post("basic/reset/:token", authController.basicReset);

authRouter.post("google/login", authController.googleLogin);
authRouter.post("facebook/login", authController.facebookLogin);