import { appLoggerService, basicAuthService } from "../services";
import { Request, Response } from "express";
import { constants, models } from "@fakelook/common";
import { params } from "../models";

export const signup = async (req: Request<never, any, models.classes.AuthUserDto>, res: Response) => {
    appLoggerService.info(`request ${req.id} started signup`);
    await basicAuthService.signup(req.body);
    appLoggerService.info(`request ${req.id} signup success`);
    res.status(constants.HTTPStatuses.created).send({
        message: "user created successfully",
    });
};

export const login = async (req: Request<never, any, models.classes.AuthUserDto>, res: Response) => {
    appLoggerService.info(`request ${req.id} started login`);
    const jwt = await basicAuthService.login(req.body);
    appLoggerService.info(`request ${req.id} login success`);
    res.send(jwt);
};

export const requestPasswordReset = async (
    req: Request<never, any, models.classes.RequestPasswordResetDto>,
    res: Response
) => {
    appLoggerService.info(`request ${req.id} started password reset token creation.`);
    await basicAuthService.requestPasswordReset(req.body);
    appLoggerService.info(`request ${req.id} succeeded creating password reset token.`);
    res.send({ message: "token sent to email" });
};

export const resetPassword = async (
    req: params.RequestWithToken<any, models.classes.ResetPasswordDto>,
    res: Response
) => {
    appLoggerService.info(`request ${req.id} started reseting password.`);
    await basicAuthService.resetPassword(req.params.token, req.body);
    appLoggerService.info(`request ${req.id} succeeded reseting password.`);
    res.send({ message: "password reset success" });
};
