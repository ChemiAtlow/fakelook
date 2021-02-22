import { constants } from "@fakelook/common";
import { Request, Response } from "express";
import { HttpError } from "../errors";
import { appLoggerService } from "../services";

export function notFoundMiddleware(req: Request, _res: Response) {
    appLoggerService.warn(`${req.id} has ended with 404 to endpoint: ${req.path}`);
    throw new HttpError(constants.HTTPStatuses.notFound, "This path does not exist!");
}
