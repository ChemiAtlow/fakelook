import { Request } from "express";
import { HTTPStatuses } from "../constants";
import { HttpError } from "../errors";
import { classes, types } from "../models";

export function notFoundMiddleware(logger: types.Logger) {
    return function (req: Request & { id: classes.guid }) {
        logger.warn(`${req.id} has ended with 404 to endpoint: ${req.path}`);
        throw new HttpError(HTTPStatuses.notFound, "This path does not exist!");
    };
}
