import axios from "axios";
import { appLoggerService } from ".";

export const exchangeCodeForAccessToken = async (code: string) => {
    try {
        const { data } = await axios.post(
            "https://oauth2.googleapis.com/token",
            {},
            {
                params: {
                    code,
                    /*eslint-disable @typescript-eslint/naming-convention*/
                    client_id:
                        "77598589513-08uj972lr28be5cdcl6a2bp8frk3h94j.apps.googleusercontent.com",
                    client_secret: "mUC4gKAn2Va0gyraYPl1hUiu",
                    redirect_uri: "",
                    grant_type: "authorization_code",
                    /*eslint-enable @typescript-eslint/naming-convention*/
                },
            }
        );
        return data;
    } catch (error) {
        appLoggerService.error('khaki', error);
    }
};
