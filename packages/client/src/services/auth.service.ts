import { fakelookServer } from "./http.service";

const authRoute = "/auth/";

export async function thirdPartyConnect(code: string, origin: string, thirdParty: "google" | "facebook") {
    const { data } = await fakelookServer.post<{ jwt: string }>(
        `${authRoute}${thirdParty}/login`,
        { code, origin }
    );
    return data;
}
