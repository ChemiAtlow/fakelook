import { AuthUser } from "@fakelook/common/src/models/interfaces";
import { sign, verify } from "jsonwebtoken";
import { appLoggerService } from ".";
import { general } from "../constants";
import { JWTInvalidError } from "../errors";

export const genrateJWT = (data: any, expiresIn: string | number) => {
    const jwt = sign(data, general.jwtSecret, { expiresIn });
    appLoggerService.verbose("generated jwt", { jwt });
    return jwt;
};

export const createAccessToken = (refreshToken: {
    refreshToken: string;
}): string => {
    const valid = verifyToken(refreshToken.refreshToken);
    if (valid) {
        appLoggerService.verbose("generate an access JWT token");
        const jwt = genrateJWT(refreshToken, "2m");
        return jwt;
    } else {
        appLoggerService.verbose("failed to decode refresh token");
        throw new JWTInvalidError(refreshToken.refreshToken);
    }
};

export const createRefreshToken = (user: AuthUser): string => {
    const userInfo = { ...user, password: undefined };
    appLoggerService.verbose("generate a refresh JWT token for user");
    return genrateJWT(userInfo, "15m");
};

export const verifyToken = (token: string): boolean => {
    try {
        const decoded = decodeToken(token);
        if (!decoded) return false;
        appLoggerService.verbose(`verified token successfuly: ${token}`, {
            decoded,
        });
        return true;
    } catch (error) {
        appLoggerService.verbose("error at verifiying token:", {
            error,
        });
        return false;
    }
};

export const decodeToken = (token: string): string | object => {
    let data: string | object = "";
    try {
        const decoded = verify(token, general.jwtSecret);
        if (!decoded) data = {};
        appLoggerService.verbose(`decoded token successfuly: ${token}`, {
            decoded,
        });
        data = decoded;
    } catch (error) {
        appLoggerService.verbose("error at decoding token:", {
            error,
        });
        data = error;
        throw new Error(error);
    }
    return data;
};
