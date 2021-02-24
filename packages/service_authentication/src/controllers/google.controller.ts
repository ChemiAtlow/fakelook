import { errors } from "@fakelook/common";
import { Request, Response } from "express";
import { googleAuthService } from "../services";

export const connectWithQueryCode = async (req: Request, res: Response) => {
    const { code } = req.query;
    if (!code) {
        throw new errors.BadRequestError("no code was provided");
    }
    const response = await googleAuthService.exchangeCodeForAccessToken(code as string);
    const userInfo = await googleAuthService.getUserInfo(response);
    res.send(userInfo);
};
