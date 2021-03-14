import axios from "axios";
import { constants } from "@fakelook/common";
const { serverDomain, serverPort } = constants.URLS;

const SERVER_URL = process.env.VUE_APP_SERVER;

const baseURL = SERVER_URL ?? `${serverDomain}:${serverPort}`;

export const fakelookServer = axios.create({ baseURL });