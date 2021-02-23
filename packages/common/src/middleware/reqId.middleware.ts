import { NextFunction, Request, Response } from "express";
import { classes, types } from "../models";

export function requestIdAssignMiddleware(logger: types.Logger) {
    return function (req: Request & { id: classes.guid }, _: Response, next: NextFunction) {
        req.id = classes.Guid.new();
        if (req.method !== "OPTIONS") {
            logger.verbose(`${req.method} - Req ${req.id} has begun to: ${req.path}.`);
        }
        next();
    };
}