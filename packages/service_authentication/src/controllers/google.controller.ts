import { constants, errors } from "@fakelook/common";
import { Request, Response } from "express";
import { googleAuthService } from "../services";

export const connectWithCode = async (req: Request, res: Response) => {
    const { code, origin } = req.body;
    if (!code) {
        throw new errors.BadRequestError("no code was provided");
    }
    const accessToken = await googleAuthService.exchangeCodeForAccessToken(code, origin);
    const userInfo = await googleAuthService.getUserInfo(accessToken);
    await googleAuthService.createAuthUserFromGoogleUser(userInfo);
    res.status(constants.HTTPStatuses.created).send({  message: "user created successfully" });
};
