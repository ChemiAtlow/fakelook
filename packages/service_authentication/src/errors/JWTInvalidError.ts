import { constants, errors } from "@fakelook/common";

export class JWTInvalidError extends errors.HttpError {
    constructor(jwt: string) {
        super(constants.HTTPStatuses.forbidden, `Couldn't proccess request: ${jwt} is invalid.`);
    }
}
