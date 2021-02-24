import { hash, compare } from "bcryptjs";
import { randomBytes } from "crypto";
import { sign } from "jsonwebtoken";
import { errors, models, constants } from "@fakelook/common";
import { userModel, getUserByEmail, getUserByUsername, getUserWithResetToken } from "../dal";
import { EmailTakenError, WrongCredentialsError } from "../errors";
import { general } from "../constants";
import { appLoggerService, emailService } from ".";

export const signup = async ({ email, password, username }: models.classes.AuthUserDto) => {
    appLoggerService.verbose("Attempt to sign up new user", { email });
    if (await getUserByEmail(email)) {
        appLoggerService.info("attempt to sign up user failed - email taken", { email });
        throw new EmailTakenError(email);
    }
    const hashedPassword = await hash(password, 12);
    const newUser = await userModel.create({
        email,
        password: hashedPassword,
        username,
    });
    await emailService.sendSignUpEmail(email);
    appLoggerService.verbose("User sign up completed successfully", { newUser });
};

export const login = async ({ email, username, password }: models.classes.AuthUserDto) => {
    appLoggerService.verbose("Attempt to login a user", { email });
    if (!email && !username) {
        appLoggerService.warn("Attempt for login failed - no email/username provided");
        throw new errors.BadRequestError("Must provide one of: email/username.");
    }
    //check if user exist
    const userFromDb = email ? await getUserByEmail(email) : await getUserByUsername(username);
    if (!userFromDb) {
        appLoggerService.info("attempt to login user failed - no user with email/username exists", { email, username });
        throw new WrongCredentialsError();
    }
    //check if encrypted password and password are matching
    const isMatchingPass = await compare(password, userFromDb.password);
    if (!isMatchingPass) {
        appLoggerService.info(
            "attempt to login user failed - the password dosen't match the hash!",
            { email }
        );
        throw new WrongCredentialsError();
    }
    appLoggerService.verbose("user password was correct - attempting to build user info", {
        userFromDb,
    });
    const jwt = createUserJWT(userFromDb.get());
    return { jwt };
};

export const requestPasswordReset = async ({ email }: models.classes.RequestPasswordResetDto) => {
    appLoggerService.verbose("Attempt to request a password reset token for user.", { email });
    //check if user exist
    const userFromDb = await getUserByEmail(email);
    if (!userFromDb) {
        appLoggerService.info("attempt to create reset token has failed - no user has this email", {
            email,
        });
        throw new WrongCredentialsError();
    }
    //Try generating reset token
    try {
        const token = randomBytes(32).toString("hex");
        appLoggerService.verbose("created token for password reset", { token, email });
        const expireDate = new Date(Date.now() + constants.TIME.month);
        await userFromDb.update({
            resetToken: token,
            resetTokenExpiration: expireDate,
        });
        await emailService.sendPasswordResetEmail(email, token);
        appLoggerService.verbose("sent token for password reset to user's email", { token, email });
    } catch (err) {
        appLoggerService.warn("Error while generating a reset token", { err });
        if (err instanceof errors.HttpError) {
            throw err;
        }
        throw new errors.HttpError(
            constants.HTTPStatuses.internalServerError,
            "An unhandeled error happened when creating reset token."
        );
    }
};

export const resetPassword = async (token: string, { password }: models.classes.ResetPasswordDto) => {
    appLoggerService.verbose("Attempt to request a password reset with token.", { token });
    //check if user exist
    const userFromDb = await getUserWithResetToken(token);
    if (!userFromDb) {
        appLoggerService.info("attempt to reset password has failed - no user has this token", {
            token,
        });
        throw new WrongCredentialsError();
    }
    appLoggerService.verbose("Found user with given reset token.", { userFromDb });
    //If user was found, his token is valid, lets reset him!
    const hashedPassword = await hash(password, 12);
    await userFromDb.update({
        resetToken: null,
        resetTokenExpiration: null,
        password: hashedPassword,
    });
    appLoggerService.verbose("User with new password saved.", { userFromDb, hashedPassword });
};

const createUserJWT = (user: models.interfaces.AuthUser) => {
    const userInfo = { ...user, password: undefined };
    appLoggerService.verbose("generate a JWT token for user", { userInfo });
    return sign(userInfo, general.jwtSecret, { expiresIn: "15m" });
};
