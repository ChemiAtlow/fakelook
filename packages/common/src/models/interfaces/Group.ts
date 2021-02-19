import { Guid } from "../classes";

export interface Group {
    Name: String;
    OwnerId: Guid;
    UsersIds: Guid[];
}
