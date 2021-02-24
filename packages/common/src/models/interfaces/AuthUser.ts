export interface AuthUser {
    id: number;
    username: string;
    password: string;
    email: string;
    role: "user" | "admin";
    resetToken?: string;
    resetTokenExpiration?: Date;
}
