import { NextFunction, Request, Response } from "express";
import { appLoggerService } from "../services";

export function assignId(req: Request, _: Response, next: NextFunction) {
    req.id = "TEMP";
    if (req.method !== "OPTIONS") {
        appLoggerService.verbose(`${req.method} - Req ${req.id} has begun to: ${req.path}.`);
    }
    next();
}
