import axios from "axios";
import { constants } from "@fakelook/common";
const { authDomain, authPort } = constants.URLS;

export const authServer = axios.create({
    baseURL: `${authDomain}:${authPort}`,
});
