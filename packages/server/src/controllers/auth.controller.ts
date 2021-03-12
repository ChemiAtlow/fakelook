import { constants } from "@fakelook/common";
import { Request, Response } from "express";
import { appLoggerService } from "../services";
import { authServer } from "../services/http.service";

export const exchangeRefreshForAccess = async (req: Request, res: Response) => {
    const body = req.body;
    if (!body) {
        appLoggerService.warn(
            `request ${req.id} failed token exchange, lacking body`
        );
    }

    try {
        const newRefresh = await authServer.post("/token/verify", body);
        const newAccess = await authServer.post("/token/refresh", newRefresh);
        res.cookie("AccessToken", newAccess);
        res.send(newRefresh);
    } catch (error) {
        appLoggerService.verbose("error exchanging tokens", { error });
    }
};

export const basicLogin = async (req: Request, res: Response) => {
    const body = req.body;
    if (!body) {
        appLoggerService.warn(
            `request ${req.id} failed basic login, lacking body`
        );
    }

    appLoggerService.verbose(
        `request ${req.id} started basic login, rerouting body to authentication.`,
        { body }
    );

    try {
        const { data } = await authServer.post("/basic/login", body);
        const { accessToken, refreshToken } = data;

        appLoggerService.verbose(
            `request ${req.id} finished basic login, got data from auth server:`,
            { data }
        );

        res.cookie("AccessToken", accessToken);
        res.send({ jwt: refreshToken });
    } catch (error) {
        appLoggerService.verbose(
            `request ${req.id} failed basic login, got error from auth server:`,
            { error }
        );

        res.status(constants.HTTPStatuses.unprocessableEntity).send(error);
    }
};
export const basicSignup = async (req: Request, res: Response) => {
    const body = req.body;
    if (!body) {
        appLoggerService.warn(
            `request ${req.id} failed basic signup, lacking body`
        );
    }

    appLoggerService.verbose(
        `request ${req.id} started basic signup, rerouting body to authentication.`,
        { body }
    );

    try {
        const { data } = await authServer.post("/basic/signup", body);

        appLoggerService.verbose(
            `request ${req.id} finished basic signup, got response from auth server:`,
            { data }
        );

        res.send({ ...data });
    } catch (error) {
        appLoggerService.verbose(
            `request ${req.id} failed basic signup, got error from auth server:`,
            { error }
        );

        res.status(constants.HTTPStatuses.unprocessableEntity).send(error);
    }
};
export const basicReqReset = async (req: Request, res: Response) => {
    const body = req.body;
    if (!body) {
        appLoggerService.warn(
            `request ${req.id} failed basic reset request, lacking body`
        );
    }

    appLoggerService.verbose(
        `request ${req.id} started basic reset request, rerouting body to authentication.`,
        { body }
    );

    try {
        const { data } = await authServer.post("/basic/reset", body);

        appLoggerService.verbose(
            `request ${req.id} finished basic reset request, got response from auth server: `,
            { data }
        );

        res.send({ ...data });
    } catch (error) {
        appLoggerService.verbose(
            `request ${req.id} failed basic request reset, got error from auth server: ${error}`
        );

        res.status(constants.HTTPStatuses.unprocessableEntity).send(error);
    }
};
export const basicReset = async (req: Request, res: Response) => {
    const body = req.body;
    if (!body) {
        appLoggerService.warn(
            `request ${req.id} failed basic reset, lacking body`
        );
    }

    appLoggerService.verbose(
        `request ${req.id} started basic reset, rerouting body to authentication.`,
        { body }
    );

    try {
        const { data } = await authServer.post("/basic/reset/:token", body);

        appLoggerService.verbose(
            `request ${req.id} finished basic reset, got response from auth server:`,
            { data }
        );

        res.send({ ...data });
    } catch (error) {
        appLoggerService.verbose(
            `request ${req.id} failed basic reset password, got error from auth server: ${error}`
        );

        res.status(constants.HTTPStatuses.unprocessableEntity).send(error);
    }
};

export const googleLogin = async (req: Request, res: Response) => {
    const body = req.body;
    if (!body) {
        appLoggerService.warn(
            `request ${req.id} failed google login request, lacking body`
        );
    }

    appLoggerService.verbose(
        `request ${req.id} started google login request, rerouting body to authentication.`,
        { body }
    );

    try {
        const { data } = await authServer.post("/google/login", body);
        const { accessToken, refreshToken } = data;

        appLoggerService.verbose(
            `request ${req.id} finished google login, got data from auth server:`,
            { data }
        );

        res.cookie("AccessToken", accessToken);
        res.send({ jwt: refreshToken });
    } catch (error) {
        appLoggerService.verbose(
            `request ${req.id} failed google login, got error from auth server:`,
            { error }
        );

        res.status(constants.HTTPStatuses.unprocessableEntity).send(error);
    }
};
export const facebookLogin = async (req: Request, res: Response) => {
    const body = req.body;
    if (!body) {
        appLoggerService.warn(
            `request ${req.id} failed facebook login request, lacking body`
        );
    }

    appLoggerService.verbose(
        `request ${req.id} started facebook login request, rerouting body to authentication.`,
        { body }
    );

    try {
        const { data } = await authServer.post("/facebook/login", body);
        const { accessToken, refreshToken } = data;

        appLoggerService.verbose(
            `request ${req.id} finished facebook login, got data from auth server:`,
            { data }
        );

        res.cookie("AccessToken", accessToken);
        res.send({ jwt: refreshToken });
    } catch (error) {
        appLoggerService.verbose(
            `request ${req.id} failed facebook login, got error from auth server:`,
            { error }
        );

        res.status(constants.HTTPStatuses.unprocessableEntity).send(error);
    }
};
