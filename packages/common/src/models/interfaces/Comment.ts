import { guid } from "../classes";
import { Post } from "./Post";
import { User } from "./User";

export interface Comment {
    id: guid;
    post: Post;
    user: User;
    time: number;
    text: string;
}
