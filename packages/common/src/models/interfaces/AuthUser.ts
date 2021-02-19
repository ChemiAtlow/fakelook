import { guid } from "../classes";

export interface AuthUser {
    id: guid;
    username: string;
    password: string;
    email: string;
    role: "user" | "admin";
}
