import { constants, models } from "@fakelook/common";
import { Request, Response } from "express";
import { appLoggerService, JWTService } from "../services";

export const verifyAndReturnNew = (req: Request, res: Response) => {
    appLoggerService.verbose(`req ${req.id} started veriying jwt`);
    try {
        const data = JWTService.decodeToken(req.body);
        const newToken = JWTService.genrateJWT(data, 0); //TODO!!get expiration and send correctly
        res.send(newToken);
    } catch (error) {
        appLoggerService.verbose("error at verifying and sending new token", {
            error,
        });
        res.status(constants.HTTPStatuses.internalServerError);
        res.send(error);
    }
};

export const exchangeTokens = (req: Request, res: Response) => {
    const refresh = req.body;
    try {
        const data: models.interfaces.AuthUser | any = JWTService.decodeToken(
            refresh
        );
        const newRefresh = JWTService.createRefreshToken(data);
        const newAccess = JWTService.createAccessToken({
            refreshToken: newRefresh,
        });
        if (data && newRefresh) {
            res.send(newAccess);
        }
    } catch (error) {
        //idk anymore
        //some res error
    }
    //maybe another error
};
