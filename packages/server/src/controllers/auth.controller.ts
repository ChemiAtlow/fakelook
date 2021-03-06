import { Request, Response } from "express";
import { authServer } from "../services/http.service";

export const basicLogin = async (req: Request, res: Response) => {
    const authRes = await authServer.post("/basic/login", req.body);
    res.send(authRes);
};
export const basicSignup = async (req: Request, res: Response) => {
    const authRes = await authServer.post("/basic/signup", req);
    res.send(authRes);
};
export const basicReqReset = async (req: Request, res: Response) => {
    const authRes = await authServer.post("/basic/reset", req);
    res.send(authRes);
};
export const basicReset = async (req: Request, res: Response) => {
    const authRes = await authServer.post("/basic/reset/:token", req);
    res.send(authRes);
};

export const googleLogin = async (req: Request, res: Response) => {
    const authRes = await authServer.post("/google/login", req);
    res.send(authRes);
};
export const facebookLogin = async (req: Request, res: Response) => {
    const authRes = await authServer.post("/facebook/login", req);
    res.send(authRes);
};