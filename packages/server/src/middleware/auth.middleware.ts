import { constants } from "@fakelook/common";
import { NextFunction, Request, Response } from "express";
import { appLoggerService } from "../services";
import { authServer } from "../services/http.service";

export function authMiddleware() {
    return function(req: Request, _: Response, next: NextFunction) {
        const cookies = req.cookies;
        const access = cookies; //retrieve specific cookie
        appLoggerService.debug("middleware cookie check", { cookies });
        try {
            const newAccess = authServer.post("/token/verify", access);
            _.cookie("AccessToken", newAccess);
            next();
        } catch (error) {
            appLoggerService.verbose("authMiddleware failed", { error });
            _.status(constants.HTTPStatuses.unauthorized);
        }
        return _.send();
    };
}
