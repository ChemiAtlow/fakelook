import { constants } from "..";
import { HttpError } from "./HttpError";

export class BadRequestError extends HttpError {
    constructor(info: string) {
        super(constants.HTTPStatuses.badRequest, `Bad Requset: ${info}`);
    }
}
