import { Guid } from "../classes";

export interface AuthUser {
    Id: Guid;
    Username: String;
    Password: String;
    Email: String;
    Role: "user" | "admin";
}
