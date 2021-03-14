import { constants, errors } from "@fakelook/common";
import { Request, Response } from "express";
import { appLoggerService, googleAuthService } from "../services";

export const connectWithCode = async (req: Request, res: Response) => {
    const { code, origin } = req.body;
    if (!code) {
        throw new errors.BadRequestError("no code was provided");
    }
    const accessToken = await googleAuthService.exchangeCodeForAccessToken(
        code,
        origin
    );
    const userInfo = await googleAuthService.getUserInfo(accessToken);
    const tokens = await googleAuthService.loginWithGoogleUser(userInfo);
    appLoggerService.verbose("Connected with google successfuly", {
        userInfo,
        tokens,
    });
    res.status(constants.HTTPStatuses.created).send(tokens);
};
