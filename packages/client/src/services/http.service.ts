import axios from "axios";
import { constants } from "@fakelook/common";
const { VUE_APP_SERVER } = process.env;
const { serverDomain, serverPort } = constants.URLS;

export const fakelookServer = axios.create({ baseURL: VUE_APP_SERVER ?? `${serverDomain}:${serverPort}` });