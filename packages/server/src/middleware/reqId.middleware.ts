import { models } from "@fakelook/common";
import { NextFunction, Request, Response } from "express";
import { appLoggerService } from "../services";

export function assignId(req: Request, _: Response, next: NextFunction) {
    req.id = models.classes.Guid.new();
    if (req.method !== "OPTIONS") {
        appLoggerService.verbose(`${req.method} - Req ${req.id} has begun to: ${req.path}.`);
    }
    next();
}
