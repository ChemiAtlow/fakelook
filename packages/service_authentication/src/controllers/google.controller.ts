import { errors } from "@fakelook/common";
import { Request, Response } from "express";
import { googleAuthService } from "../services";

export const connectWithCode = async (req: Request, res: Response) => {
    const { code } = req.body;
    if (!code) {
        throw new errors.BadRequestError("no code was provided");
    }
    const response = await googleAuthService.exchangeCodeForAccessToken(code);
    console.log(response);
    res.send(200);
};
