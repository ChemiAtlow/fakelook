import { models } from "@fakelook/common";
import { fakelookServer } from "./http.service";

const authRoute = "/auth/";

export async function thirdPartyConnect(
    code: string,
    origin: string,
    thirdParty: "google" | "facebook"
) {
    const { data } = await fakelookServer.post<{ jwt: string }>(`${authRoute}${thirdParty}/login`, {
        code,
        origin,
    });
    return data;
}

export async function signup(user: models.classes.AuthUserDto) {
    await fakelookServer.post<void>(`${authRoute}basic/signup`, {
        ...user,
    });
}

export async function login(user: models.classes.AuthUserDto) {
    const { data } = await fakelookServer.post<{ jwt: string }>(`${authRoute}basic/login`, {
        ...user,
    });
    return data;
}

export async function requestPasswordReset(user: models.classes.RequestPasswordResetDto) {
    await fakelookServer.post<void>(`${authRoute}basic/reset`, {
        ...user,
    });
}

export async function resetPassword(token: string, user: models.classes.ResetPasswordDto) {
    await fakelookServer.post<void>(`${authRoute}basic/reset/${token}`, {
        ...user,
    });
}
