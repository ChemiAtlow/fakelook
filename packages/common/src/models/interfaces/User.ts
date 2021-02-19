import { guid } from "../classes";
import { AuthUser } from "./AuthUser";
import { Post } from "./Post";

export interface User {
    id: guid;
    authUser: AuthUser;
    firstName: string;
    lastName: string;
    longitude: number;
    latitude: number;
    posts: Post[];
    friends: User[];
    blocked: User[];
}
