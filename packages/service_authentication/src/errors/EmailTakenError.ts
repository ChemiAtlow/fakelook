import { constants, errors } from "@fakelook/common";

export class EmailTakenError extends errors.HttpError {
    constructor(email: string) {
        super(constants.HTTPStatuses.unprocessableEntity, `Couldn't proccess request: ${email} is in use.`);
    }
}
