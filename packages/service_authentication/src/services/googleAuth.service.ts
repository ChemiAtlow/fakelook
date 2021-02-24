import axios from 'axios';
import { appLoggerService } from '.';

export const exchangeCodeForAccessToken = async (code: string) => {
    try {
        const { data } = await axios.post(
            'https://oauth2.googleapis.com/token',
            {},
            {
                params: {
                    code,
                    /*eslint-disable @typescript-eslint/naming-convention*/
                    client_id:
                        '77598589513-08uj972lr28be5cdcl6a2bp8frk3h94j.apps.googleusercontent.com',
                    client_secret: 'mUC4gKAn2Va0gyraYPl1hUiu',
                    redirect_uri: 'http://localhost:4441/google/callback',
                    grant_type: 'authorization_code',
                    /*eslint-enable @typescript-eslint/naming-convention*/
                },
            }
        );
        return data.access_token;
    } catch (error) {
        appLoggerService.error('khaki', error);
        throw new Error('OO');
    }
};

export const getUserInfo = async (accessToken: string) => {
    const {
        data,
    } = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
        { headers: { authorization: `Bearer ${accessToken}` } }
    );
    return data;
};
