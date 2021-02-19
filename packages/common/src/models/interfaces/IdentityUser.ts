import { Guid } from "../classes";

export interface IdentityUser {
    Id: Guid;
    AuthUserId: Guid;
    FirstName: String;
    LastName: String;
    Longitude: Number;
    Latitude: Number;
    PostsIds: Guid[];
    FriendsIds: Guid[];
    BlockedIds: Guid[];
}
