import { User } from "./User";
import { Post } from "./Post";

export interface Tag {
    post: Post;
    user: User;
}
