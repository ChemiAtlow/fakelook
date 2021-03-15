import { models } from "@fakelook/common";
import { reactive } from "vue";

const AUTH_KEY = "fakelookJWT";

type AuthData = {
    isConnected: boolean;
    expireTime?: number;
    jwt?: string;
    userInfo?: models.interfaces.User;
};

const token = window.localStorage.getItem(AUTH_KEY);

if (token) {
    try {
        const oldInfo: Pick<Required<AuthData>, "expireTime" | "jwt"> = JSON.parse(token);
        if (oldInfo && (oldInfo.expireTime || 0) > Date.now()) {
            //User data is relevant, go fetch his full info.
        }
    } catch {
        // console.warn("Issue with old info!");
    }
}

export const activeUser = reactive<AuthData>({
    isConnected: false,
});

export const setUser = ({
    expireTime,
    jwt,
    userInfo,
}: Pick<Required<AuthData>, "expireTime" | "jwt" | "userInfo">): void => {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ jwt, expireTime }));
    activeUser.userInfo = userInfo;
    activeUser.expireTime = expireTime;
    activeUser.jwt = jwt;
    activeUser.isConnected = true;
};

export const logout = (): Promise<void> => {
    localStorage.removeItem(AUTH_KEY);
    activeUser.userInfo = undefined;
    activeUser.expireTime = 0;
    activeUser.jwt = undefined;
    activeUser.isConnected = false;
    return Promise.resolve();
};
