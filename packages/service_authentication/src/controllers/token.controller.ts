import { models } from "@fakelook/common";
import { Request, Response } from "express";
import { appLoggerService, JWTService } from "../services";

export const exchangeTokens = (req: Request, res: Response) => {
    const refresh = req.body;
    appLoggerService.verbose(`req ${req.id} started exchanging tokens`);
    try {
        const data: models.interfaces.AuthUser | any = JWTService.decodeToken(
            refresh
        );
        const newRefresh = JWTService.createRefreshToken(data);
        const newAccess = JWTService.createAccessToken(newRefresh);
        if (data && newRefresh) {
            res.send(newAccess);
        }
    } catch (error) {
        appLoggerService.warn("error while exchanging token", error);
        throw error;
    }
    //maybe another error
};
