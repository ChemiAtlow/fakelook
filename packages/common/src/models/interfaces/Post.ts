import { Guid } from "../classes";

export interface Post {
    Id: Guid;
    UserId: Guid;
    Time: Date;
    Scope: "public" | "friends";
    Image: String;
    Longitude: Number;
    Latitude: Number;
    Hashtags: String[];
}