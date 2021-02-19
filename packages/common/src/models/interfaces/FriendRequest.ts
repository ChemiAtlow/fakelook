import { guid } from "../classes";

export interface FriendRequest {
    id: guid;
    senderId: guid;
    receiverId: guid;
    state: "pending" | "accepted" | "denied" | "canceled";
}
