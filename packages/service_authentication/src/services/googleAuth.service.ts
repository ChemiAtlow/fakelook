import axios from "axios";
import { appLoggerService, emailService } from ".";
import { getUserByEmail, userModel } from "../dal";
import type { GoogleUser } from "../models";

export const exchangeCodeForAccessToken = async (
    code: string,
    origin: string
) => {
    const {
        GOOGLE_CLIENT_ID: clientId,
        GOOGLE_CLIENT_SECRET: clientSecret,
    } = process.env;
    const qs = `code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${origin}&grant_type=authorization_code`;
    try {
        const { data } = await axios.post(
            `https://oauth2.googleapis.com/token?${qs}`
        );
        return data.access_token;
    } catch (error) {
        appLoggerService.error("khaki", error);
        throw new Error("OO");
    }
};

export const getUserInfo = async (accessToken: string) => {
    const { data } = await axios.get<GoogleUser>(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
        { headers: { authorization: `Bearer ${accessToken}` } }
    );
    return data;
};

export const createAuthUserFromGoogleUser = async (gUser: GoogleUser) => {
    const { email, id, given_name: username } = gUser;
    let user = await getUserByEmail(email);
    if (!user) {
        await userModel.create({
            email,
            username: `${username}_${id}`,
            password: `GOOGLE-${id}`,
            provider: "google",
        });
        await emailService.sendSignUpEmail(email);
    }
    return user;
};
