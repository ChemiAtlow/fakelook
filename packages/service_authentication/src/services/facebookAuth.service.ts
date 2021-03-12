import axios from "axios";
import { appLoggerService, emailService } from ".";
import { userModel, getUserByEmail } from "../dal";
import { EmailTakenError } from "../errors";
import type { FacebookUser } from "../models";
import { createAccessToken, createRefreshToken } from "./jwt.service";

export const exchangeCodeForAccessToken = async (
    code: string,
    origin: string
) => {
    const {
        FACEBOOK_CLIENT_ID: clientId,
        FACEBOOK_CLIENT_SECRET: clientSecret,
    } = process.env;
    const qs = `code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${origin}`;
    
    try {
        const { data } = await axios.get(
            `https://graph.facebook.com/v10.0/oauth/access_token?${qs}`
        );
        return data.access_token;
    } catch (error) {
        appLoggerService.error("khakiFB", error);
        throw new Error("OO");
    }
};

export const getUserInfo = async (accessToken: string) => {
    const { data } = await axios.get<FacebookUser>(
        `https://graph.facebook.com/me?fields=id,email,first_name,last_name,birthday,picture&access_token=${accessToken}`
    );

    return data;
};

export const createAuthUserFromFacebookUser = async (fbUser: FacebookUser) => {
    const { email, id, first_name: username } = fbUser;
    let user = await getUserByEmail(email);

    if (!user) {
        user = await userModel.create({
            email,
            username: `${username}_${id}`,
            password: `Facebook-${id}`,
            provider: "facebook",
        });
        await emailService.sendSignUpEmail(email);
    }

    return user;
};

export const loginWithFBUser = async (fbUser: FacebookUser) => {
    const { email, id, first_name: username } = fbUser;
    let user = await getUserByEmail(email);

    if (!user) {
        user = await userModel.create({
            email,
            username: `${username}_${id}`,
            password: `Facebook-${id}`,
            provider: "facebook",
        });
        await emailService.sendSignUpEmail(email);
    }

    if(user.provider !== "facebook"){
        throw new EmailTakenError(user.email);
    }

    const refreshToken = createRefreshToken(user.get());
    const accessToken = createAccessToken({ refreshToken });

    return { accessToken, refreshToken }
};
