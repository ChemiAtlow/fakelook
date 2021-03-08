import { AuthUser } from "@fakelook/common/src/models/interfaces";
import { sign, verify } from "jsonwebtoken";
import { appLoggerService } from ".";
import { general } from "../constants";
import { JWTInvalidError } from "../errors";

export const createAccessToken = (refreshToken: string): string => {
    const valid = verifyToken(refreshToken);
    if (valid) {
        appLoggerService.verbose("generate an access JWT token:");
        return sign(refreshToken, general.jwtSecret, { expiresIn: "15m" });
    } else {
        appLoggerService.verbose("failed to decode refresh token");
        throw new JWTInvalidError(refreshToken);
    }
};

export const createRefreshToken = (user: AuthUser): string => {
    const userInfo = { ...user, password: undefined };
    appLoggerService.verbose("generate a refresh JWT token for user", {
        userInfo,
    });
    return sign(userInfo, general.jwtSecret, { expiresIn: "5h" });
};

export const verifyToken = (token: string): boolean => {
    try {
        const decoded = verify(token, general.jwtSecret);
        appLoggerService.verbose("decoded token successfuly:", {
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
