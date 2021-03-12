import axios from "axios";
import { constants } from "@fakelook/common";
const { serverDomain, serverPort } = constants.URLS;

export const fakelookServer = axios.create({ baseURL: process.env.VUE_APP_SERVER ?? `${serverDomain}:${serverPort}` });