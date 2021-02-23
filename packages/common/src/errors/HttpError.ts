import { constants } from "..";

export class HttpError extends Error {
    constructor(public status: constants.HTTPStatuses, public message: string) {
        super(message);
    }
}
