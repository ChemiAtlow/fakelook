import { Guid } from "../classes";

export interface FriendRequest {
    Id: Guid;
    SenderId: Guid;
    ReceiverId: Guid;
    State: "pending" | "accepted" | "denied" | "canceled";
}
