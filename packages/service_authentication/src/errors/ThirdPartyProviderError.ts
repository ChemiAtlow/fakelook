import { constants, errors } from "@fakelook/common";

export class ThirdPartyProviderError extends errors.HttpError {
    constructor(provider: string) {
        super(constants.HTTPStatuses.forbidden, `Couldn't proccess request: ${provider}'s users are not authorized.`);
    }
}