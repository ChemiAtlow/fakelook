import { models } from "@fakelook/common";
import { reactive } from "vue";

type AuthData = {
    isConnected: boolean;
    expireTime?: number;
    jwt?: string;
    userInfo?: models.interfaces.User;
}

export const activeUser = reactive<AuthData>({
    isConnected: false,
});