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
    let res = false;
    verify(token, general.jwtSecret, (err, decoded) => {
        if (decoded) {
            appLoggerService.verbose("decoded token successfuly:", {
                decoded,
            });
            res = true;
        } else {
            appLoggerService.verbose("error at verifiying token:", {
                err,
            });
        }
    });
    return res;
};
