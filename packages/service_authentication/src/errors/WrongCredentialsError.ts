import { constants, errors } from "@fakelook/common";

export class WrongCredentialsError extends errors.HttpError {
    constructor() {
        super(constants.HTTPStatuses.unprocessableEntity, `The request has failed: no user with these credentials was found.`);
    }
}
