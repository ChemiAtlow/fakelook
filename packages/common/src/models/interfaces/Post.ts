import { guid } from "../classes";
import { User } from "./User";

export interface Post {
    id: guid;
    user: User;
    time: number;
    scope: "public" | "friends";
    image: string;
    text: string;
    longitude: number;
    latitude: number;
    hashtags: string[];
}
