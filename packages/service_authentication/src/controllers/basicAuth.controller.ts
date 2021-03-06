import { appLoggerService, basicAuthService } from "../services";
import { Request, Response } from "express";
import { params } from "../models";
import { constants, models } from "@fakelook/common";

export const signup = async (
    req: Request<never, models.classes.AuthUserDto>,
    res: Response
) => {
    appLoggerService.info(`request ${req.id} started signup`);
    try {
        await basicAuthService.signup(req.body);
        appLoggerService.info(`request ${req.id} signup success`);
        res.status(constants.HTTPStatuses.created).send({
            message: "user created successfully",
        });
    } catch (error) {
        appLoggerService.info(`request ${req.id} signup failed: ${error}`);
        res.status(constants.HTTPStatuses.unprocessableEntity).send({
            message: `user creation failed: ${error}`,
        });
    }
};

export const login = async (
    req: Request<never, any, models.classes.AuthUserDto>,
    res: Response
) => {
    appLoggerService.info(`request ${req.id} started login`);
    try {
        const jwts = await basicAuthService.login(req.body);
        appLoggerService.info(`request ${req.id} login success`);
        res.status(constants.HTTPStatuses.ok).send(jwts);
    } catch (error) {
        appLoggerService.info(`request ${req.id} login failed: ${error}`);
        res.status(constants.HTTPStatuses.unprocessableEntity).send(error);
    }
};

export const requestPasswordReset = async (
    req: Request<never, any, models.classes.RequestPasswordResetDto>,
    res: Response
) => {
    appLoggerService.info(
        `request ${req.id} started password reset token creation.`
    );
    await basicAuthService.requestPasswordReset(req.body);
    appLoggerService.info(
        `request ${req.id} succeeded creating password reset token.`
    );
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
