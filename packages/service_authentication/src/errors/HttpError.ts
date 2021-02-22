import { constants } from "@fakelook/common";

export class HttpError extends Error {
    constructor(public status: constants.HTTPStatuses, public message: string) {
        super(message);
    }
}
