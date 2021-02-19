import { User } from "./User";

export interface Group {
    name: string;
    owner: User;
    users: User[];
}
