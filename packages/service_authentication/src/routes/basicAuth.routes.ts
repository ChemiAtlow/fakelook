import { middleware, models } from "@fakelook/common";
import { Router } from "express";
import { basicAuthController } from "../controllers";
import { appLoggerService } from "../services";

export const basicAuthRoutes = Router();

basicAuthRoutes.post(
    "/signup",
    middleware.validationMiddleware(appLoggerService, models.classes.AuthUserDto),
    basicAuthController.signup
);
basicAuthRoutes.post(
    "/login",
    middleware.validationMiddleware(appLoggerService, models.classes.AuthUserDto, true),
    basicAuthController.login
);
basicAuthRoutes.post(
    "/reset",
    middleware.validationMiddleware(appLoggerService, models.classes.RequestPasswordResetDto),
    basicAuthController.requestPasswordReset
);
basicAuthRoutes.post(
    "/reset/:token",
    middleware.validationMiddleware(appLoggerService, models.classes.ResetPasswordDto),
    basicAuthController.resetPassword
);
