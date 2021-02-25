import { constants } from '@fakelook/common';
import axios from 'axios';
import { appLoggerService } from '.';
import type { GoogleUser } from '../models';
const { authDomain, authPort } = constants.URLS;

export const exchangeCodeForAccessToken = async (code: string) => {
    const { GOOGLE_CLIENT_ID: clientId, GOOGLE_CLIENT_SECRET: clientSecret } = process.env;
    const redirectURI = `${authDomain}:${authPort}/google/callback`;
    const qs = `code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectURI}&grant_type=authorization_code`;
    try {
        const { data } = await axios.post(`https://oauth2.googleapis.com/token?${qs}`);
        return data.access_token;
    } catch (error) {
        appLoggerService.error('khaki', error);
        throw new Error('OO');
    }
};

export const getUserInfo = async (accessToken: string) => {
    const {
        data,
    } = await axios.get<GoogleUser>(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
        { headers: { authorization: `Bearer ${accessToken}` } }
    );
    return data;
};
