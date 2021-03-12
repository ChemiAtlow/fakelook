import { Router } from "express";
import { authController } from "../controllers";

export const authRoutes = Router();

authRoutes.post("/basic/login", authController.basicLogin);
authRoutes.post("/basic/signup", authController.basicSignup);
authRoutes.post("/basic/reset", authController.basicReqReset);
authRoutes.post("/basic/reset/:token", authController.basicReset);

authRoutes.post("/google/login", authController.googleLogin);
authRoutes.post("/facebook/login", authController.facebookLogin);

authRoutes.post("/token/refresh", authController.exchangeRefreshForAccess);