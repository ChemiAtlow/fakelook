import { authServer } from "../services/http.service";

export const basicLogin = (...params: any[]) => {
    authServer.post("/basic/login", params);
};
export const basicSignup = (...params: any[]) => {
    authServer.post("/basic/signup", params);
};
export const basicReqReset = (...params: any[]) => {
    authServer.post("/basic/reset", params);
};
export const basicReset = (...params: any[]) => {
    authServer.post("/basic/reset/:token", params);
};

export const googleLogin = (...params: any[]) => {
    authServer.post("/google/login", params);
};
export const facebookLogin = (...params: any[]) => {
    authServer.post("/facebook/login", params);
};