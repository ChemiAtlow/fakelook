import { guid } from "../classes";
import { Post } from "./Post";

export interface User {
    id: guid;
    authUser: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    dateOfBirth: number;
    posts: Post[];
    friends: User[];
    blocked: User[];
}
