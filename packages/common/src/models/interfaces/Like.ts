import { Comment } from "./Comment";
import { Post } from "./Post";
import { User } from "./User";

export default interface Like {
    likedItem: Post | Comment;
    user: User;
}
