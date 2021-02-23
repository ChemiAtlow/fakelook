import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors";
import { classes, types } from "../models";

export function errorMiddleware(logger: types.Logger) {
    return function(
        error: HttpError,
        req: Request & { id: classes.guid },
        res: Response,
        _: NextFunction
    ) {
        logger.warn(`${req.id} has completed with an error`, { error });
        const { status = 500, message = "Somthing went wrong" } = error;
        res.status(status).send({
            status,
            message,
        });
    };
}
