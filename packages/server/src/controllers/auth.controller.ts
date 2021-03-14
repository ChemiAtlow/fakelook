import { Request, Response } from "express";
import { appLoggerService } from "../services";
import { authServer } from "../services/http.service";

export const basicLogin = async (req: Request, res: Response) => {
    appLoggerService.verbose(
        `request ${req.id} started basic login, rerouting to authentication server`
    );
    const { data } = await authServer.post("/basic/login", req.body);
    appLoggerService.verbose(
        `request ${req.id} finished basic login, got response from auth server: ${data}`
    );
    res.send(data);
};
export const basicSignup = async (req: Request, res: Response) => {
    appLoggerService.verbose(
        `request ${req.id} started basic signup, rerouting to authentication server`
    );
    const { data } = await authServer.post("/basic/signup", req.body);
    appLoggerService.verbose(
        `request ${req.id} finished basic signup, got response from auth server: ${data}`
    );
    res.send(data);
};
export const basicReqReset = async (req: Request, res: Response) => {
    appLoggerService.verbose(
        `request ${req.id} started basic reset request, rerouting to authentication server`
    );
    const { data } = await authServer.post("/basic/reset", req.body);
    appLoggerService.verbose(
        `request ${req.id} finished basic reset request, got response from auth server: ${data}`
    );
    res.send(data);
};
export const basicReset = async (req: Request, res: Response) => {
    appLoggerService.verbose(
        `request ${req.id} started basic reset, rerouting to authentication server`
    );
    const { data } = await authServer.post("/basic/reset/:token", req.body);
    appLoggerService.verbose(
        `request ${req.id} finished basic reset, got response from auth server: ${data}`
    );
    res.send(data);
};

export const googleLogin = async (req: Request, res: Response) => {
    appLoggerService.verbose(
        `request ${req.id} started google login, rerouting to authentication server`
    );
    const { data } = await authServer.post("/google/login", req.body);
    appLoggerService.verbose(
        `request ${req.id} finished google login, got response from auth server: ${data}`
    );
    res.send(data);
};
export const facebookLogin = async (req: Request, res: Response) => {
    appLoggerService.verbose(
        `request ${req.id} started facebook login, rerouting to authentication server`
    );
    const { data } = await authServer.post("/facebook/login", req.body);
    appLoggerService.verbose(
        `request ${req.id} finished facebook login, got response from auth server: ${data}`
    );
    res.send(data);
};
