import { constants, errors } from "@fakelook/common";
import { Request, Response } from "express";
import { appLoggerService, facebookAuthService } from "../services";

export const connectWithCode = async (req: Request, res: Response) => {
    const { code, origin } = req.body;
    if (!code) {
        throw new errors.BadRequestError("no code was provided");
    }
    const accessToken = await facebookAuthService.exchangeCodeForAccessToken(
        code,
        origin
    );
    const userInfo = await facebookAuthService.getUserInfo(accessToken);
    const tokens = await facebookAuthService.loginWithFBUser(userInfo);
    appLoggerService.info("Connected with facebook successfuly", {
        userInfo,
        tokens,
    });
    res.status(constants.HTTPStatuses.created).send(tokens);
};
