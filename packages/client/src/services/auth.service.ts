import { fakelookServer } from "./http.service";

const authRoute = "/auth/";

export async function connect(code: string, origin: string) {
    return await fakelookServer.post<{ jwt: string }>(`${authRoute}google/login`, { code, origin });
}
