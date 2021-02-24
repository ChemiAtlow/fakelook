import { Router } from "express";
import { basicAuthController } from "../controllers";

export const basicAuthRoutes = Router();

basicAuthRoutes.post('/signup', basicAuthController.signup);
basicAuthRoutes.post('/login', basicAuthController.login);
basicAuthRoutes.post('/reset', basicAuthController.requestPasswordReset);
basicAuthRoutes.post('/reset/:token', basicAuthController.resetPassword);