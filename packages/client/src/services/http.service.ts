import axios from "axios";
import { constants } from "@fakelook/common";
const { serverDomain, serverPort } = constants.URLS;

const SERVER_URL = "VUE_APP_SERVER";

const baseURL = SERVER_URL.startsWith("VUE_APP_") ? `${serverDomain}:${serverPort}` : SERVER_URL;

export const fakelookServer = axios.create({ baseURL });